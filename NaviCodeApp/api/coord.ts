const BASE_URL = 'http://222.122.81.141:5000';

export interface CoordTypeResponse {
  type: '1' | '2';
}

export async function getCoordType(navicode: string) {
  const res = await fetch(`${BASE_URL}/coord_type`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ navicode }),
  });
  const data: CoordTypeResponse = await res.json();
  return data.type;
}

export interface StaticCoord {
  latitude: number;
  longitude: number;
  name: string;
}

export async function getCoordStatic(navicode: string) {
  const res = await fetch(`${BASE_URL}/get_coord_static`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ navicode }),
  });
  const data: StaticCoord = await res.json();
  return data;
}

export interface DynamicCoord {
  latitude: number;
  longitude: number;
  name: string;
}

export async function getCoordDynamic(
  navicode: string,
  latitude: string,
  longitude: string,
) {
  const res = await fetch(`${BASE_URL}/get_coord_dynamic`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ navicode, latitude, longitude }),
  });
  const data: DynamicCoord[] = await res.json();
  return data;
}