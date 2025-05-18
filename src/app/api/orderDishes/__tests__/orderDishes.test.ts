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
    where: jest.fn(),
    insert: jest.fn(),
    values: jest.fn(),
    returning: jest.fn(),
  },
}));

describe('GET /api/order-dishes', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 500 on error and logs to Sentry', async () => {
    (dbModule.db.select as jest.Mock).mockImplementation(() => {
      throw new Error('DB error');
    });

    const req = {
      url: 'http://localhost/api/order-dishes',
    } as any;

    const res = await GET(req);
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('POST /api/order-dishes', () => {
  beforeEach(() => jest.clearAllMocks());

  const createRequest = (body: any) => ({
    json: async () => body,
  });

  it('returns 400 if orderId or dishId missing', async () => {
    const req = createRequest({ orderId: 'order1' });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toBe('orderId and dishId are required');
  });

  it('returns 500 on error and logs to Sentry', async () => {
    (dbModule.db.insert as jest.Mock).mockImplementation(() => {
      throw new Error('DB insert error');
    });

    const req = createRequest({
      orderId: 'order1',
      dishId: 'dish1',
    });

    const res = await POST(req as any);
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
