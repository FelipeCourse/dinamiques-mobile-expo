import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import {
  ArrowLinkComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ContentBoxComponent,
  HeroComponent,
  ProtectedRouteComponent,
  StudentFormComponent,
  TitleComponent,
} from '@/components';

export default function StudentAddAdminScreen(): JSX.Element {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Admin', path: '/admin' },
    { label: 'Alunos', path: '/admin/students' },
    { label: 'Adicionar', path: '' },
  ];

  return (
    <ProtectedRouteComponent requiredRole={ROLES.teacher}>
      <FlatList
        ListHeaderComponent={
          <HeroComponent>
            <ArrowLinkComponent path="/(drawer)/admin/students" />
            <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
            <HeroComponent.Header>
              <TitleComponent>Alunos</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={[{}]}
        keyExtractor={(item, index) => String(index)}
        renderItem={() => null}
        ListFooterComponent={
          <ContentBoxComponent>
            <StudentFormComponent />
          </ContentBoxComponent>
        }
      />
    </ProtectedRouteComponent>
  );
}
