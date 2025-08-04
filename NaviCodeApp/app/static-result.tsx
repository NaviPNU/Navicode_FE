import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@emotion/react';
import type { AppTheme } from '@/theme';
import { MapViewWithPin } from '@/components/MapViewWithPin/MapViewWithPin';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Linking from 'expo-linking';

export default function StaticResultScreen() {
  const { name, latitude, longitude } = useLocalSearchParams<{
    name: string;
    latitude: string;
    longitude: string;
  }>();
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const coords = {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`;
    Linking.openURL(url);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${name} (${coords.latitude}, ${coords.longitude})`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <MapViewWithPin markerCoords={coords} />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: theme.colors.backgroundFill,
          opacity: 0.9,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textSub }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.coords}>
            {coords.latitude.toFixed(6)}, {coords.longitude.toFixed(6)}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleDirections}>
              <Text style={styles.buttonText}>길찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleShare}>
              <Text style={styles.buttonText}>공유</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

function useStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: { flex: 1 },
    sheetContent: {
      padding: theme.spacing.spacing4,
      gap: theme.spacing.spacing2,
    },
    title: {
      ...theme.typography.title2Bold,
      color: theme.colors.textDefault,
    },
    coords: {
      ...theme.typography.body2Regular,
      color: theme.colors.textSub,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: theme.spacing.spacing2,
      marginTop: theme.spacing.spacing2,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundDefault,
      paddingVertical: theme.spacing.spacing2,
      borderRadius: theme.spacing.spacing3,
    },
    buttonText: {
      ...theme.typography.body2Bold,
      color: theme.colors.textDefault,
    },
  });
}
