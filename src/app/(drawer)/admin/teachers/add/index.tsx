import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import {
  ArrowLinkComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ContentBoxComponent,
  HeroComponent,
  ProtectedRouteComponent,
  TeacherFormComponent,
  TitleComponent,
} from '@/components';

export default function TeacherAddAdminScreen(): JSX.Element {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Admin', path: '/admin' },
    { label: 'Docentes', path: '/admin/teachers' },
    { label: 'Adicionar', path: '' },
  ];

  return (
    <ProtectedRouteComponent requiredRole={ROLES.teacher}>
      <FlatList
        ListHeaderComponent={
          <HeroComponent>
            <ArrowLinkComponent path="/(drawer)/admin/teachers" />
            <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
            <HeroComponent.Header>
              <TitleComponent>Docentes</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={[{}]}
        keyExtractor={(item, index) => String(index)}
        renderItem={() => null}
        ListFooterComponent={
          <ContentBoxComponent>
            <TeacherFormComponent />
          </ContentBoxComponent>
        }
      />
    </ProtectedRouteComponent>
  );
}
