import { useTheme } from '@emotion/react';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Container, Title, Back, Right } from './Header.styles';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
}

export function Header({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
}: HeaderProps) {
  const theme = useTheme();

  return (
    <Container>
      {showBack && (
        <Back onPress={onBackPress}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.colors.textDefault}
          />
        </Back>
      )}
      <Title>{title}</Title>
      {rightIcon && <Right onPress={onRightPress}>{rightIcon}</Right>}
    </Container>
  );
}