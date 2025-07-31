import styled from '@emotion/native';
import { AppTheme } from '@/theme';

export const SheetContainer = styled.View(({ theme }: { theme: AppTheme }) => ({
  backgroundColor: theme.colors.backgroundDefault,
  borderTopLeftRadius: theme.spacing.spacing4,
  borderTopRightRadius: theme.spacing.spacing4,
  overflow: 'hidden',
}));

export const Handle = styled.View(({ theme }: { theme: AppTheme }) => ({
  width: theme.spacing.spacing10,
  height: theme.spacing.spacing1,
  borderRadius: 2,
  backgroundColor: theme.colors.gray400,
  alignSelf: 'center',
  marginVertical: theme.spacing.spacing2,
}));
