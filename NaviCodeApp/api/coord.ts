import { request } from './client';

export interface CoordTypeResponse {
  type: '1' | '2';
}

export async function getCoordType(navicode: string) {
  const data = await request<CoordTypeResponse>('/coord_type', {
    body: { navicode },
  });
  return data.type;
}

export interface StaticCoord {
  latitude: number;
  longitude: number;
  name: string;
}

export async function getCoordStatic(navicode: string) {
  return request<StaticCoord>('/get_coord_static', {
    body: { navicode },
  });
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
  return request<DynamicCoord[]>('/get_coord_dynamic', {
    body: { navicode, latitude, longitude },
  });
}