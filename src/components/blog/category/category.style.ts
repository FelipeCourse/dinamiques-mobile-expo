import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  categoryContainer: {
    borderWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: colors.base[14](),
  },
  categoryContainerSelected: {
    backgroundColor: colors.primary[5](),
  },
  categoryName: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    letterSpacing: 0.21,
    textTransform: 'uppercase',
    color: colors.base.white(),
    borderBottomWidth: 1,
  },
  categoryNameSelected: {
    color: colors.primary[8](),
  },
});
