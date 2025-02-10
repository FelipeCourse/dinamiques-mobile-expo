import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import {
  ArrowLinkComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  CategoryFormComponent,
  ContentBoxComponent,
  HeroComponent,
  ProtectedRouteComponent,
  TitleComponent,
} from '@/components';

export default function CategoryAddAdminScreen(): JSX.Element {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Admin', path: '/admin' },
    { label: 'Categorias', path: '/admin/categories' },
    { label: 'Adicionar', path: '' },
  ];

  return (
    <ProtectedRouteComponent requiredRole={ROLES.teacher}>
      <FlatList
        ListHeaderComponent={
          <HeroComponent>
            <ArrowLinkComponent path="/(drawer)/admin/categories" />
            <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
            <HeroComponent.Header>
              <TitleComponent>Categorias</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={[{}]}
        keyExtractor={(item, index) => String(index)}
        renderItem={() => null}
        ListFooterComponent={
          <ContentBoxComponent>
            <CategoryFormComponent />
          </ContentBoxComponent>
        }
      />
    </ProtectedRouteComponent>
  );
}
