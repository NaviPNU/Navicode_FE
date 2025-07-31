import styled from '@emotion/native';
import { AppTheme } from '@/theme';

export const Container = styled.View(({ theme }: { theme: AppTheme }) => ({
  height: theme.spacing.spacing14,
  paddingHorizontal: theme.spacing.spacing4,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const Title = styled.Text(({ theme }: { theme: AppTheme }) => ({
  ...theme.typography.title2Bold,
  fontFamily: theme.fonts.primary,
}));

const IconButton = styled.TouchableOpacity(
  ({ theme }: { theme: AppTheme }) => ({
    width: theme.spacing.spacing10,
    height: theme.spacing.spacing10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

export const Back = styled(IconButton)({});
export const Right = styled(IconButton)({});
