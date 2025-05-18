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

describe('/api/orders/[id] API handlers', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('GET', () => {
    it('returns 404 if order not found', async () => {
      (dbModule.db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      });

      const params = Promise.resolve({ id: 'missing' });
      const res = await GET({} as any, { params });
      expect(res.status).toBe(404);
      const text = await res.text();
      expect(text).toBe('Order not found');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.select as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const params = Promise.resolve({ id: 'order1' });
      const res = await GET({} as any, { params });
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });

  describe('PATCH', () => {
    it('returns 400 if no id', async () => {
      const params = Promise.resolve({ id: '' });
      const req = { json: async () => ({ status: 'completed' }) } as any;
      const res = await PATCH(req, { params });
      expect(res.status).toBe(400);
      const text = await res.text();
      expect(text).toBe('id is required');
    });

    it('returns 404 if order not found', async () => {
      (dbModule.db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      });

      const params = Promise.resolve({ id: 'order1' });
      const req = { json: async () => ({ status: 'completed' }) } as any;
      const res = await PATCH(req, { params });
      expect(res.status).toBe(404);
      const text = await res.text();
      expect(text).toBe('Order not found');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.select as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const params = Promise.resolve({ id: 'order1' });
      const req = { json: async () => ({ status: 'completed' }) } as any;
      const res = await PATCH(req, { params });
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });

  describe('DELETE', () => {
    it('deletes order and returns 204', async () => {
      (dbModule.db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: 'order1' }]),
        }),
      });

      const params = Promise.resolve({ id: 'order1' });
      const res = await DELETE({} as any, { params });
      expect(res.status).toBe(204);
    });

    it('returns 404 if order not found', async () => {
      (dbModule.db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([]),
        }),
      });

      const params = Promise.resolve({ id: 'missing' });
      const res = await DELETE({} as any, { params });
      expect(res.status).toBe(404);
      const text = await res.text();
      expect(text).toBe('Order not found');
    });

    it('logs and returns 500 on error', async () => {
      (dbModule.db.delete as jest.Mock).mockImplementation(() => {
        throw new Error('DB error');
      });

      const params = Promise.resolve({ id: 'order1' });
      const res = await DELETE({} as any, { params });
      expect(res.status).toBe(500);
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });
});
