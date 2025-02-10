import { StyleSheet } from 'react-native';

import { colors } from '@/styles';

export const s = StyleSheet.create({
  searchInputField: {
    zIndex: 1,
  },
  searchInputIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 16,
    height: 14,
    color: colors.primary[3](),
  },
});
