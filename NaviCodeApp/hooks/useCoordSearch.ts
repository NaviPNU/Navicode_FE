import { useState } from 'react';
import {
  getCoordType,
  getCoordStatic,
  getCoordDynamic,
  StaticCoord,
  DynamicCoord,
} from '@/api/coord';

interface Location {
  latitude: number;
  longitude: number;
}

export function useCoordSearch() {
  const [resultType, setResultType] = useState<'1' | '2' | null>(null);
  const [staticResult, setStaticResult] = useState<StaticCoord | null>(null);
  const [dynamicResult, setDynamicResult] = useState<DynamicCoord[]>([]);

  const search = async (navicode: string, location?: Location) => {
    const type = await getCoordType(navicode);
    setResultType(type);
    if (type === '1' && location) {
      const res = await getCoordDynamic(
        navicode,
        location.latitude.toString(),
        location.longitude.toString(),
      );
      setDynamicResult(res);
      setStaticResult(null);
    } else if (type === '2') {
      const res = await getCoordStatic(navicode);
      setStaticResult(res);
      setDynamicResult([]);
    } else {
      setStaticResult(null);
      setDynamicResult([]);
    }
  };

  return { resultType, staticResult, dynamicResult, search };
}