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
    delete: jest.fn(),
    returning: jest.fn(),
  },
}));

const mockMenu = {
  id: '1',
  title: 'Main Menu',
  description: 'Our main menu',
};

describe('GET /api/menus/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 404 if menu not found', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    const res = await GET({} as any, { params: Promise.resolve({ id: '2' }) });
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Menu not found');
  });

  it('returns 500 on DB error', async () => {
    (dbModule.db.select as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const res = await GET({} as any, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('PATCH /api/menus/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  const updates = { title: 'Updated Title' };

  const createRequest = (body: any): any => ({
    json: async () => body,
  });

  it('returns 400 if no id', async () => {
    const req = createRequest(updates);
    const res = await PATCH(req, { params: Promise.resolve({ id: '' }) });
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toBe('Menu ID is required');
  });

  it('returns 404 if menu not found', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    const req = createRequest(updates);
    const res = await PATCH(req, { params: Promise.resolve({ id: '99' }) });

    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Menu not found');
  });

  it('returns 500 on DB error', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([mockMenu]),
      }),
    });

    (dbModule.db.update as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const req = createRequest(updates);
    const res = await PATCH(req, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('DELETE /api/menus/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 204 if deleted', async () => {
    const returningMock = jest.fn().mockResolvedValueOnce([mockMenu]);
    const whereMock = jest.fn().mockReturnThis();
    (dbModule.db.delete as jest.Mock).mockReturnValueOnce({
      where: whereMock,
      returning: returningMock,
    });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(204);
  });

  it('returns 404 if menu not found', async () => {
    const returningMock = jest.fn().mockResolvedValueOnce([]);
    const whereMock = jest.fn().mockReturnThis();
    (dbModule.db.delete as jest.Mock).mockReturnValueOnce({
      where: whereMock,
      returning: returningMock,
    });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: '99' }) });
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Menu not found');
  });

  it('returns 500 on DB error', async () => {
    (dbModule.db.delete as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
