import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  articlesContainer: {
    marginTop: 80,
  },
  articlesItem: {
    marginBottom: 40,
  },
  articlesNotAvailable: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    textAlign: 'center',
    color: colors.base[5](),
  },
});
