import { StyleSheet } from 'react-native';

import { borderRadius, colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  buttonContainer: {
    maxHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[7](),
    borderRadius: borderRadius.lg,
  },
  buttonLoadingContainer: {
    paddingVertical: 12,
  },
  buttonText: {
    paddingVertical: 12,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    letterSpacing: 0.7,
    color: colors.primary[8](),
    textTransform: 'uppercase',
  },
  buttonTextExtraSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: fontSize.xs,
    lineHeight: fontSize['xs-lh'],
    letterSpacing: 0.6,
  },
});
