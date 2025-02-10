import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  titleBarDecorator: {
    width: 4,
    marginRight: 16,
    backgroundColor: colors.primary[7](),
  },
  titleDotDecorator: {
    marginBottom: 0,
    marginLeft: 2,
    width: 6,
    height: 6,
    borderRadius: 100,
    alignSelf: 'flex-end',
    backgroundColor: colors.primary[7](),
  },
  titleText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['h3-md'],
    lineHeight: fontSize['h3-md-lh'],
    letterSpacing: fontSize['h3-md-ls'],
    color: colors.base.white(),
    textTransform: 'uppercase',
  },
});
