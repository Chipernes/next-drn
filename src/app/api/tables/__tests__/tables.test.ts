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

describe('/api/tables API handlers', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('GET', () => {
    it('logs and returns 500 on error', async () => {
      (dbModule.db.select as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const res = await GET();
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });

  describe('POST', () => {
    it('returns 400 if number is missing', async () => {
      const req = {
        json: async () => ({}),
      } as any;

      const res = await POST(req);
      expect(res.status).toBe(400);
      const text = await res.text();
      expect(text).toBe('number is required');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.insert as jest.Mock).mockImplementation(() => {
        throw new Error('DB insert error');
      });

      const req = {
        json: async () => ({ number: 10 }),
      } as any;

      const res = await POST(req);
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });
});
