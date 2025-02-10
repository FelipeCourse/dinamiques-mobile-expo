import { Text, TextInputProps, View } from 'react-native';

import { s } from './title.style';

type TitleComponentProps = TextInputProps & {
  hasBarDecorator?: boolean;
  hasDotDecorator?: boolean;
};

export function TitleComponent({
  hasBarDecorator = true,
  hasDotDecorator = false,
  style,
  children,
}: TitleComponentProps): JSX.Element {
  return (
    <View style={s.titleContainer}>
      {hasBarDecorator && <View style={s.titleBarDecorator} />}
      <Text style={[s.titleText, style]}>
        {children} {hasDotDecorator && <View style={s.titleDotDecorator} />}
      </Text>
    </View>
  );
}
