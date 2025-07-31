import styled from '@emotion/native';
import { AppTheme } from '@/theme';

export const SheetContainer = styled.View(({ theme }: { theme: AppTheme }) => ({
  backgroundColor: theme.colors.backgroundDefault,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  overflow: 'hidden',
}));

export const Handle = styled.View(({ theme }: { theme: AppTheme }) => ({
  width: 40,
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.colors.gray400,
  alignSelf: 'center',
  marginVertical: 8,
}));