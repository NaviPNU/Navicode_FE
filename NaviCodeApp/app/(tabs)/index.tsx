import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@emotion/react';
import type { AppTheme } from '@/theme';
import { MapViewWithPin } from '@/components/MapViewWithPin/MapViewWithPin';
import { SearchBar } from '@/components/SearchBar';

export default function HomeScreen() {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>NaviCode</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <MapViewWithPin showUserLocation />
        <View style={styles.searchOverlay} pointerEvents="box-none">
          <SearchBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

function useStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundDefault,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.spacing4,
      paddingVertical: theme.spacing.spacing4,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.spacing2,
    },
    brandText: {
      textAlign: 'center',
      ...theme.typography.title1Bold,
      color: theme.colors.textDefault,
    },
    mapContainer: {
      flex: 1,
            position: 'relative',
    },
    searchOverlay: {
      position: 'absolute',
      top: theme.spacing.spacing4,
      left: 0,
      right: 0,
      zIndex: 1,
    },
  });
}
