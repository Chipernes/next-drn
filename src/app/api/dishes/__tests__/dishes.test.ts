/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';
import * as dbModule from '../../../../../database/drizzle';
import { GET, POST } from '../route';

global.Response = class {
  constructor(body: any, init: any) {
    this.status = init.status;
    this._body = body;
  }

  status: number;

  _body: any;

  async json() {
    return JSON.parse(this._body);
  }
} as any;

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

jest.mock('../../../../../database/drizzle', () => ({
  db: {
    select: jest.fn(),
    from: jest.fn(),
    insert: jest.fn(),
  },
}));

describe('GET /api/dishes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 500 on DB error', async () => {
    (dbModule.db.select as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const res = await GET();
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('POST /api/dishes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validBody = {
    menuId: 'menu1',
    title: 'Soup',
    description: 'Hot',
    price: 100,
    weight: 250,
    picture: 'soup.jpg',
    isHidden: false,
  };

  const createRequest = (body: any): any => ({
    json: async () => body,
  });

  it('returns 400 if fields are missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
    const { title, ...invalidBody } = validBody;
    const res = await POST(createRequest(invalidBody));
    expect(res.status).toBe(400);
    const bodyText = await (res as any)._body;
    expect(bodyText).toMatch(/Missing fields/);
  });

  it('returns 500 on DB error', async () => {
    (dbModule.db.insert as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const res = await POST(createRequest(validBody));
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
