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
    update: jest.fn(),
    set: jest.fn(),
    where: jest.fn(),
    returning: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('GET /api/order-dishes/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 404 if not found', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    const params = Promise.resolve({ id: '999' });
    const res = await GET({} as any, { params });
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Order Dish not found');
  });

  it('returns 500 on error', async () => {
    (dbModule.db.select as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const params = Promise.resolve({ id: '1' });
    const res = await GET({} as any, { params });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('PATCH /api/order-dishes/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  const updatedDish = {
    id: '1',
    order_id: 'order1',
    dish_id: 'dish1',
    quantity: 3,
    status: 'served',
  };

  const createRequest = (body: any) => ({
    json: async () => body,
  });

  it('returns 400 if id missing', async () => {
    const params = Promise.resolve({ id: '' });
    const req = createRequest({ quantity: 2 });
    const res = await PATCH(req as any, { params });
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toBe('id is required');
  });

  it('returns 404 if dish not found', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    const params = Promise.resolve({ id: '999' });
    const req = createRequest({ quantity: 2 });
    const res = await PATCH(req as any, { params });
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Order Dish not found');
  });

  it('returns 500 on error', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([updatedDish]),
      }),
    });

    (dbModule.db.update as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB update error');
    });

    const params = Promise.resolve({ id: '1' });
    const req = createRequest({ quantity: 3 });

    const res = await PATCH(req as any, { params });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('DELETE /api/order-dishes/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deletes the order dish and returns 204', async () => {
    (dbModule.db.delete as jest.Mock).mockReturnValueOnce({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValueOnce([{ id: '1' }]),
      }),
    });

    const params = Promise.resolve({ id: '1' });
    const res = await DELETE({} as any, { params });
    expect(res.status).toBe(204);
  });

  it('returns 404 if dish not found', async () => {
    (dbModule.db.delete as jest.Mock).mockReturnValueOnce({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    const params = Promise.resolve({ id: '999' });
    const res = await DELETE({} as any, { params });
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Order Dish not found');
  });

  it('returns 500 on error', async () => {
    (dbModule.db.delete as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB delete error');
    });

    const params = Promise.resolve({ id: '1' });
    const res = await DELETE({} as any, { params });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
