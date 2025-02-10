import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  userContainer: {
    marginRight: 20,
    flexDirection: 'row',
    gap: 8,
  },
  userName: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    lineHeight: fontSize['xs-lh'],
    color: colors.base[6](),
  },
  userButton: {
    backgroundColor: 'transparent',
  },
});
