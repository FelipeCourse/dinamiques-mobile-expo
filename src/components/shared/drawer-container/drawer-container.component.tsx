import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { colors } from '@/styles';

import { DrawerContentComponent } from '../drawer-content/drawer-content.component';
import { UserComponent } from '../user/user.component';

type DrawerContainerComponentProps = {
  children: React.ReactNode;
};

export function DrawerContainerComponent({
  children,
}: DrawerContainerComponentProps): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          sceneStyle: {
            backgroundColor: colors.base[16](),
          },
          headerShown: true,
          headerTintColor: colors.base.white(),
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.base[15](),
            borderBottomColor: colors.base[14](),
          },
          headerRight: () => <UserComponent />,
          drawerStyle: {
            backgroundColor: colors.base[15](),
            borderWidth: 1,
            borderColor: colors.base[14](),
          },
        }}
        drawerContent={(props) => <DrawerContentComponent {...props} />}
      >
        {children}
      </Drawer>
    </GestureHandlerRootView>
  );
}
