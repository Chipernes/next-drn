/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';
import * as dbModule from '../../../../../database/drizzle';
import { GET, POST } from '../route';

global.Response = class {
  constructor(body: any, init: any) {
    this.status = init?.status ?? 200;
    this._body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  status: number;

  _body: string;

  async json() {
    return JSON.parse(this._body);
  }

  async text() {
    return this._body;
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
    values: jest.fn(),
    returning: jest.fn(),
  },
}));

describe('GET /api/employees', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 500 and logs error on DB failure', async () => {
    (dbModule.db.select as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const res = await GET();
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('POST /api/employees', () => {
  beforeEach(() => jest.clearAllMocks());

  const validBody = {
    first_name: 'Jane',
    last_name: 'Smith',
    picture: 'newpic.jpg',
    role: 'Chef',
  };

  const createRequest = (body: any): any => ({
    json: async () => body,
  });

  it('returns 400 if required fields are missing', async () => {
    const req = createRequest({ firstName: 'Jane' }); // missing lastName, role
    const res = await POST(req);
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toMatch(/Missing required fields/);
  });

  it('returns 500 and logs error on DB failure', async () => {
    (dbModule.db.insert as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const req = createRequest(validBody);
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
