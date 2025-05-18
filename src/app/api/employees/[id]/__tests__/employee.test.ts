/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';
import * as dbModule from '../../../../../../database/drizzle';
import { GET, PATCH, DELETE } from '../route';

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

const mockEmployee = {
  id: '1',
  first_name: 'John',
  last_name: 'Doe',
  picture: 'pic.jpg',
  role: 'Manager',
};

describe('GET /api/employees/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 404 if employee not found', async () => {
    (dbModule.db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => Promise.resolve([]),
      }),
    } as any);

    const res = await GET({} as any, { params: Promise.resolve({ id: '999' }) });
    expect(res.status).toBe(404);
  });

  it('returns 500 and logs error on DB failure', async () => {
    (dbModule.db.select as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const res = await GET({} as any, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('PATCH /api/employees/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  const validBody = {
    firstName: 'Jane',
    lastName: 'Smith',
    picture: 'newpic.jpg',
    role: 'Chef',
  };

  const createRequest = (body: any): any => ({
    json: async () => body,
  });

  it('returns 404 if employee to update not found', async () => {
    const setMock = jest.fn().mockReturnThis();
    const whereMock = jest.fn().mockReturnThis();
    const returningMock = jest.fn().mockResolvedValueOnce([]);

    (dbModule.db.update as jest.Mock).mockReturnValueOnce({
      set: setMock,
      where: whereMock,
      returning: returningMock,
    });

    const req = createRequest(validBody);
    const res = await PATCH(req, { params: Promise.resolve({ id: '999' }) });

    expect(res.status).toBe(404);
  });

  it('returns 500 and logs error on DB failure', async () => {
    (dbModule.db.update as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const req = createRequest(validBody);
    const res = await PATCH(req, { params: Promise.resolve({ id: '1' }) });

    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});

describe('DELETE /api/employees/[id]', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 204 if delete successful', async () => {
    const whereMock = jest.fn().mockReturnThis();
    const returningMock = jest.fn().mockResolvedValueOnce([mockEmployee]);

    (dbModule.db.delete as jest.Mock).mockReturnValueOnce({
      where: whereMock,
      returning: returningMock,
    });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: '1' }) });

    expect(res.status).toBe(204);
  });

  it('returns 404 if employee to delete not found', async () => {
    const whereMock = jest.fn().mockReturnThis();
    const returningMock = jest.fn().mockResolvedValueOnce([]);

    (dbModule.db.delete as jest.Mock).mockReturnValueOnce({
      where: whereMock,
      returning: returningMock,
    });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: '999' }) });

    expect(res.status).toBe(404);
  });

  it('returns 500 and logs error on DB failure', async () => {
    (dbModule.db.delete as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: '1' }) });

    expect(res.status).toBe(500);
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
