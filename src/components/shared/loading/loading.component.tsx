import { ActivityIndicator } from 'react-native';

import { colors } from '@/styles';

import { s } from './loading.style';

export function LoadingComponent(): JSX.Element {
  return (
    <ActivityIndicator
      style={s.loading}
      color={colors.primary[7]()}
      size={32}
    />
  );
}
