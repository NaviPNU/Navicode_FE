import React, { useRef } from 'react';
import BottomSheetRN from '@gorhom/bottom-sheet';
import { SheetContainer, Handle } from './BottomSheet.styles';

interface BottomSheetProps {
  snapPoints?: Array<string | number>;
  initialIndex?: number;
  children: React.ReactNode;
  onClose?: () => void;
}

export function BottomSheet({
  snapPoints = ['50%'],
  initialIndex = 0,
  children,
  onClose,
}: BottomSheetProps) {
  const sheetRef = useRef<BottomSheetRN>(null);

  return (
    <BottomSheetRN
      ref={sheetRef}
      index={initialIndex}
      snapPoints={snapPoints}
      enablePanDownToClose={Boolean(onClose)}
      onClose={onClose}
      handleComponent={() => <Handle />}
      backgroundComponent={({ style }) => <SheetContainer style={style} />}
    >
      {children}
    </BottomSheetRN>
  );
}