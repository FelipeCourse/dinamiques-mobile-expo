import { StyleSheet } from 'react-native';

import { borderRadius, colors, fontFamily, fontSize } from '@/styles';

export const s = StyleSheet.create({
  resourceTableContainer: {
    position: 'relative',
    marginBottom: 40,
    padding: 20,
    gap: 8,
    backgroundColor: colors.base[15](),
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.base[14](),
  },
  resourceTableActionsContainer: {
    position: 'absolute',
    top: -12,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  resourceTableActions: {
    padding: 8,
    backgroundColor: colors.base[16](),
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.base[13](),
  },
  resourceTableFieldContainer: {
    flexDirection: 'row',
  },
  resourceTableFieldCommon: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    lineHeight: fontSize['xs-lh'],
  },
  resourceTableFieldColumn: {
    width: 100,
    color: colors.base.white(),
  },
  resourceTableFieldValue: {
    fontFamily: fontFamily.regular,
    color: colors.base[6](),
    textTransform: 'capitalize',
  },
  resourceTableFieldIsActiveFalse: {
    color: colors.error[4](),
  },
  resourceTableFieldIsActiveTrue: {
    color: colors.success[4](),
  },
});
