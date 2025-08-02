import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@emotion/react';
import type { AppTheme } from '@/theme';

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBar({
  placeholder = 'NaviCode 검색',
  onChangeText,
}: SearchBarProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="search"
        size={20}
        color={theme.colors.textPlaceholder}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textPlaceholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function useStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: theme.spacing.spacing4,
      marginBottom: theme.spacing.spacing4,
      backgroundColor: theme.colors.backgroundFill,
      borderRadius: theme.spacing.spacing6,
      borderWidth: 1,
      borderColor: theme.colors.borderDefault,
      paddingHorizontal: theme.spacing.spacing3,
      paddingVertical: theme.spacing.spacing2,
      gap: theme.spacing.spacing2,
    },
    input: {
      flex: 1,
      ...theme.typography.body1Regular,
      color: theme.colors.textDefault,
    },
  });
}