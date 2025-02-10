import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
import { ArrowSmallLeftIcon } from 'react-native-heroicons/outline';

import { colors } from '@/styles';

import { s } from './arrow-link.style';

type ArrowLinkComponentProps = TouchableOpacityProps & {
  path: string;
};

export function ArrowLinkComponent({
  path,
}: ArrowLinkComponentProps): JSX.Element {
  return (
    <TouchableOpacity
      style={s.arrowLinkContainer}
      activeOpacity={0.8}
      onPress={() => router.push(path as never)}
    >
      <ArrowSmallLeftIcon size={20} color={colors.base.white()} />
    </TouchableOpacity>
  );
}
