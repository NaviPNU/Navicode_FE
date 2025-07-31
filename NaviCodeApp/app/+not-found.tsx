import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useTheme } from '@emotion/react';
import type { AppTheme } from '@/theme';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

function useStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.spacing5,
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
  });
}
