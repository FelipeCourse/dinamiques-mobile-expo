import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Pressable, PressableProps, Text } from 'react-native';

import { s } from './drawer-button.style';

type DrawerButtonComponentProps = PressableProps & {
  title?: DrawerNavigationOptions | string;
  isFocused?: boolean;
};

export function DrawerButtonComponent({
  title = '',
  isFocused = false,
  ...rest
}: DrawerButtonComponentProps): JSX.Element {
  return (
    <Pressable style={[s.drawerButton]} {...rest}>
      <Text
        style={[s.drawerButtonTitle, isFocused && s.drawerButtonTitleFocused]}
      >
        {title.toString()}
      </Text>
    </Pressable>
  );
}
