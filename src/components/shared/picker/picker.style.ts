import { StyleSheet } from 'react-native';

import { borderRadius, colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  picker: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base.white(),
    backgroundColor: colors.base[15](),
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.base[14](),
  },
});
