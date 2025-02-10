import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View } from 'react-native';

import { DrawerButtonComponent } from '../drawer-button/drawer-button.component';
import { LogoComponent } from '../logo/logo.component';
import { s } from './drawer-content.style';

export function DrawerContentComponent(
  drawerProps: DrawerContentComponentProps,
): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <View style={s.drawerContentLogoContainer}>
        <LogoComponent />
      </View>

      <View>
        {drawerProps.state.routes.map((route, index) => {
          const isFocused = drawerProps.state.index === index;
          const options = drawerProps.descriptors[route.key].options;

          const onPress = () => {
            const event = drawerProps.navigation.emit({
              type: 'drawerItemPress',
              canPreventDefault: true,
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              drawerProps.navigation.navigate(route.name, route.params);
            }
          };

          return (
            <DrawerButtonComponent
              key={route.key}
              title={options.drawerLabel?.toString()}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}
