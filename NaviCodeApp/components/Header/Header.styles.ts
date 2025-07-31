import styled from '@emotion/native';
import { AppTheme } from '@/theme';

export const Container = styled.View(({ theme }: { theme: AppTheme }) => ({
  height: 56,
  paddingHorizontal: theme.spacing.spacing4,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const Title = styled.Text(({ theme }: { theme: AppTheme }) => ({
  ...theme.typography.title2Bold,
  fontFamily: 'Pretendard',
}));

const IconButton = styled.TouchableOpacity({
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
});

export const Back = styled(IconButton)({});
export const Right = styled(IconButton)({});