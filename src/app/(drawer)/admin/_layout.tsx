import { Drawer } from 'expo-router/drawer';

import { ROLES } from '@/constants';

import { useAuthContext } from '@/contexts';

import { DrawerContainerComponent } from '@/components';

export default function DrawerLayout() {
  const { userData } = useAuthContext();

  const isTeacher = userData?.roleName === ROLES.teacher;

  const screens = [
    {
      name: 'index',
      label: 'Início',
    },
    {
      name: 'teachers/index',
      label: 'Docentes',
      redirect: !isTeacher,
    },
    {
      name: 'students/index',
      label: 'Alunos',
      redirect: !isTeacher,
    },
    {
      name: 'categories/index',
      label: 'Categorias',
      redirect: !isTeacher,
    },
    {
      name: 'articles/index',
      label: 'Artigos',
      redirect: !isTeacher,
    },
  ];

  const filteredScreens = screens.filter(
    (screen) => !screen.name.includes('/add') && !screen.name.includes('/[id]'),
  );

  return (
    <DrawerContainerComponent>
      {filteredScreens.map((screen) => {
        return (
          <Drawer.Screen
            key={screen.name}
            name={screen.name}
            options={{
              drawerLabel: screen.label,
            }}
            redirect={screen.redirect}
          />
        );
      })}
    </DrawerContainerComponent>
  );
}
