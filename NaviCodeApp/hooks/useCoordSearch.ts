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
      return { type, staticResult: null, dynamicResult: res };
    }

    if (type === '2') {
      const res = await getCoordStatic(navicode);
      setStaticResult(res);
      setDynamicResult([]);
      return { type, staticResult: res, dynamicResult: [] };
    }
    setStaticResult(null);
    setDynamicResult([]);
    return { type: null, staticResult: null, dynamicResult: [] };
  };

  return { resultType, staticResult, dynamicResult, search };
}
