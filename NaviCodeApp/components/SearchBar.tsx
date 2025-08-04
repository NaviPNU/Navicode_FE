import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@emotion/react';
import type { AppTheme } from '@/theme';
import { useCode } from '@/contexts/CodeContext';
import { useCoordSearch } from '@/hooks/useCoordSearch';

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  location?: { latitude: number; longitude: number };
}

export function SearchBar({
  placeholder = 'NaviCode 검색',
  onChangeText,
  location,
}: SearchBarProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);
  const { state } = useCode();
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const { resultType, staticResult, dynamicResult, search } = useCoordSearch();

  const handleChangeText = (value: string) => {
    setText(value);
    onChangeText?.(value);
  };

  const handleSelect = (value: string) => {
    setText(value);
    onChangeText?.(value);
    setFocused(false);
  };

  const handleSearch = async () => {
    try {
      await search(text, location);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSearch}>
          <MaterialIcons
            name="search"
            size={20}
            color={theme.colors.textPlaceholder}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textPlaceholder}
          keyboardType="phone-pad"
          onChangeText={handleChangeText}
          value={text}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSearch}
        />
      </View>
      {focused && (
        <View style={styles.dropdown}>
          {state.recent.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>최근 검색</Text>
              {state.recent.map((item) => (
                <TouchableOpacity
                  key={`recent-${item.code}`}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.itemText}>{item.code}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {state.favorites.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>즐겨찾기</Text>
              {state.favorites.map((item) => (
                <TouchableOpacity
                  key={`favorite-${item.code}`}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.itemText}>{item.code}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
      {resultType === '2' && staticResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.sectionTitle}>정적 결과</Text>
          <Text style={styles.itemText}>{staticResult.name}</Text>
        </View>
      )}
      {resultType === '1' && dynamicResult.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.sectionTitle}>동적 결과</Text>
          {dynamicResult.map((item, idx) => (
            <Text key={idx} style={styles.itemText}>
              {item.name}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function useStyles(theme: AppTheme) {
  return StyleSheet.create({
    wrapper: {
      marginHorizontal: theme.spacing.spacing4,
      marginBottom: theme.spacing.spacing4,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
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
    dropdown: {
      marginTop: theme.spacing.spacing1,
      backgroundColor: theme.colors.backgroundDefault,
      borderWidth: 1,
      borderColor: theme.colors.borderDefault,
      borderRadius: theme.spacing.spacing3,
      padding: theme.spacing.spacing2,
      gap: theme.spacing.spacing2,
    },
    resultContainer: {
      marginTop: theme.spacing.spacing1,
      backgroundColor: theme.colors.backgroundDefault,
      borderWidth: 1,
      borderColor: theme.colors.borderDefault,
      borderRadius: theme.spacing.spacing3,
      padding: theme.spacing.spacing2,
      gap: theme.spacing.spacing2,
    },
    section: {
      gap: theme.spacing.spacing1,
    },
    sectionTitle: {
      ...theme.typography.label1Bold,
      color: theme.colors.textSub,
    },
    itemText: {
      ...theme.typography.body2Regular,
      color: theme.colors.textDefault,
      paddingVertical: theme.spacing.spacing1,
    },
  });
}