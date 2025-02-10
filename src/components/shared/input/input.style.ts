import { StyleSheet } from 'react-native';

import { borderRadius, colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    color: colors.base[3](),
  },
  inputFieldContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
  },
  inputField: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base.white(),
    backgroundColor: colors.base[15](),
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.base[14](),
  },
  inputFieldOnFocus: {
    borderColor: colors.primary[3](),
  },
  inputFiledError: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.error[4](),
  },
});
