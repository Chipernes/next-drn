/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';
import * as dbModule from '../../../../../../database/drizzle';
import { GET, PATCH, DELETE } from '../route';

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

jest.mock('../../../../../../database/drizzle', () => ({
  db: {
    select: jest.fn(),
    from: jest.fn(),
    where: jest.fn(),
    update: jest.fn(),
    set: jest.fn(),
    returning: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('/api/tables/[id] API handlers', () => {
  beforeEach(() => jest.clearAllMocks());

  const params = Promise.resolve({ id: 'table1' });

  describe('GET', () => {
    it('returns 404 if table not found', async () => {
      (dbModule.db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      });

      const res = await GET({} as any, { params });
      expect(res.status).toBe(404);
      const text = await res.text();
      expect(text).toBe('Table not found');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.select as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const res = await GET({} as any, { params });
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });

  describe('PATCH', () => {
    it('returns 400 if number missing', async () => {
      const req = {
        json: async () => ({}),
      } as any;

      const res = await PATCH(req, { params });
      expect(res.status).toBe(400);
      const text = await res.text();
      expect(text).toBe('number is required');
    });

    it('returns 404 if table not found', async () => {
      (dbModule.db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      });

      const req = {
        json: async () => ({ number: 15 }),
      } as any;

      const res = await PATCH(req, { params });
      expect(res.status).toBe(404);
      const text = await res.text();
      expect(text).toBe('Table not found');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.select as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const req = {
        json: async () => ({ number: 10 }),
      } as any;

      const res = await PATCH(req, { params });
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });

  describe('DELETE', () => {
    it('deletes the table', async () => {
      const deleted = [{ id: 'table1', number: 10 }];

      (dbModule.db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue(deleted),
        }),
      });

      const res = await DELETE({} as any, { params });
      expect(res.status).toBe(204);
    });

    it('returns 404 if table not found', async () => {
      (dbModule.db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([]),
        }),
      });

      const res = await DELETE({} as any, { params });
      expect(res.status).toBe(404);
      const text = await res.text();
      expect(text).toBe('Table not found');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.delete as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const res = await DELETE({} as any, { params });
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });
});
