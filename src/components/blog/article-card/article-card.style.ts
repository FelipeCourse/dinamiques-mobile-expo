import { StyleSheet } from 'react-native';

import { borderRadius, colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  articleCardContainer: {
    backgroundColor: colors.base[15](),
    borderWidth: 1,
    borderColor: colors.base[14](),
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },

  articleCardImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 36,
  },

  articleCardImage: {
    zIndex: -1,
    height: 213,
    backgroundColor: colors.primary[4](),
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },

  articleCardHeader: {
    paddingHorizontal: 20,
    gap: 12,
  },
  articleCardHeaderCategoryContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  articleCardHeaderCategoryDecorator: {
    width: 2,
  },
  articleCardHeaderCategoryName: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    lineHeight: fontSize['xs-lh'],
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.base.white(),
  },
  articleCardHeaderTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 22,
    lineHeight: 33,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.primary[3](),
  },

  articleCardContentSummary: {
    marginTop: 24,
    marginBottom: 60,
    paddingHorizontal: 20,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base[6](),
  },

  articleCardFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  articleCardMetadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  articleCardAuthorAvatar: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.base[16](),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.primary[4](),
  },

  articleCardAuthorMetadataContainer: {
    gap: 4,
  },

  articleCardAuthorName: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    lineHeight: fontSize['sm-lh'],
    color: colors.base[4](),
  },

  articleCardPublishLastDate: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    lineHeight: fontSize['xs-lh'],
    color: colors.base[6](),
  },

  readingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readingTimeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize['xs'],
    lineHeight: fontSize['xs-lh'],
    color: colors.base.white(),
  },
});
