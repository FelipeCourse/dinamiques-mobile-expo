import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  signUpFormTip: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base[6](),
    textAlign: 'center',
  },
});
