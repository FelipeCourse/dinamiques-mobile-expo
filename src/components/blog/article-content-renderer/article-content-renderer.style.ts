import { StyleSheet } from 'react-native';

import { borderRadius, colors, fontFamily, fontSize, spacing } from '@/styles';

export const s = StyleSheet.create({
  heading1: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['h3-lg'],
    lineHeight: fontSize['h3-lg-lh'],
    letterSpacing: fontSize['h3-lg-ls'],
    color: colors.primary[3](),
    textTransform: 'uppercase',
  },
  heading2: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['h3-xs'],
    lineHeight: fontSize['h3-xs-lh'],
    letterSpacing: fontSize['h3-xs-ls'],
    color: colors.primary[3](),
    textTransform: 'uppercase',
  },
  heading3: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['lg'],
    lineHeight: fontSize['lg-lh'],
    letterSpacing: 0.9,
    color: colors.primary[3](),
    textTransform: 'uppercase',
  },
  heading4: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['lg'],
    lineHeight: fontSize['lg-lh'],
    letterSpacing: 0.9,
    color: colors.primary[3](),
    textTransform: 'uppercase',
  },
  heading5: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['lg'],
    lineHeight: fontSize['lg-lh'],
    letterSpacing: 0.9,
    color: colors.primary[3](),
    textTransform: 'uppercase',
  },
  heading6: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['lg'],
    lineHeight: fontSize['lg-lh'],
    letterSpacing: 0.9,
    color: colors.primary[3](),
    textTransform: 'uppercase',
  },
  paragraph: {
    marginTop: spacing[0],
    marginBottom: spacing[7],
    fontFamily: fontFamily.regular,
    fontSize: fontSize['md'],
    lineHeight: fontSize['md-lh'],
    color: colors.base[5](),
  },
  ordered_list: {
    marginBottom: spacing[7],
  },
  bullet_list: {
    marginBottom: spacing[7],
  },
  list_item: {
    marginBottom: spacing[4],
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['md'],
    lineHeight: fontSize['md-lh'],
    color: colors.base[4](),
  },
  blockquote: {
    marginBottom: spacing[7],
    padding: 8,
    fontFamily: fontFamily.regular,
    color: colors.base.white(),
    backgroundColor: colors.base[14](),
  },
  link: {
    fontFamily: fontFamily.regular,
    color: colors.primary[5](),
  },
  image: {
    borderRadius: borderRadius.md,
  },
  table: {
    marginBottom: spacing[7],
    borderColor: colors.base[4](),
    color: colors.base[4](),
  },
  tr: {
    borderColor: colors.base[4](),
  },
});
