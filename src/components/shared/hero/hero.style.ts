import { StyleSheet } from 'react-native';

import { colors } from '@/styles';

export const s = StyleSheet.create({
  heroContainer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.base[15](),
  },
  heroContainerBackground: {
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  heroBackgroundImage: {
    zIndex: -1,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  heroContent: {
    marginTop: 24,
    marginBottom: 60,
  },
  heroDecorator: {
    width: '100%',
    height: 0,
  },
});
