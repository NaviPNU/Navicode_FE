import { getCoordType, getCoordStatic, getCoordDynamic } from '../coord';

describe('coord api', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('코드 타입을 반환한다', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ type: '1' }),
    });

    await expect(getCoordType('3232')).resolves.toBe('1');
  });

  it('코드 타입 요청을 올바르게 보낸다', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ type: '2' }),
    });

    await getCoordType('3333');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://222.122.81.141:5000/coord_type',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navicode: '3333' }),
      },
    );
  });

  it('정적 좌표를 가져온다', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ latitude: 1, longitude: 2, name: 'test' }),
    });

    await expect(getCoordStatic('3333')).resolves.toEqual({
      latitude: 1,
      longitude: 2,
      name: 'test',
    });
  });

  it('동적 좌표를 가져온다', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => [{ latitude: 1, longitude: 2, name: 'a' }],
    });

    await expect(getCoordDynamic('3232', '1', '2')).resolves.toEqual([
      { latitude: 1, longitude: 2, name: 'a' },
    ]);
  });
});