import { StyleSheet } from 'react-native';

import { colors, fontFamily } from '@/styles';

export const s = StyleSheet.create({
  breadcrumbContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  breadcrumbItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbSeparator: {
    width: 2,
    height: 12,
    marginHorizontal: 8,
    backgroundColor: colors.base[11](),
  },
  breadcrumbLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.base[6](),
  },
  breadcrumbLastItem: {
    color: colors.primary[3](),
  },
});
