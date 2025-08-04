import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@emotion/react';
import type { AppTheme } from '@/theme';
import { BottomBar } from '@/components/BottomBar/BottomBar';

export default function MakeScreen() {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Make Screen</Text>
      <BottomBar selected="make" />
    </View>
  );
}

function useStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundDefault,
    },
    text: {
      ...theme.typography.body1Regular,
      color: theme.colors.textDefault,
    },
  });
}
