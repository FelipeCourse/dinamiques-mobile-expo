import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  drawerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerButtonTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    color: colors.base.white(),
    textTransform: 'capitalize',
  },
  drawerButtonTitleFocused: { color: colors.primary[5]() },
});
