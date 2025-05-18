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

describe('GET /api/menus', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 500 on error', async () => {
    (dbModule.db.select as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const res = await GET();
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('POST /api/menus', () => {
  beforeEach(() => jest.clearAllMocks());

  const createRequest = (body: any): any => ({
    json: async () => body,
  });

  it('returns 400 if missing required fields', async () => {
    const req = createRequest({ title: '' });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toBe('Missing required fields: title, type');
  });

  it('returns 500 on error', async () => {
    (dbModule.db.insert as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const req = createRequest({ title: 'Test', type: 'main' });
    const res = await POST(req);

    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
