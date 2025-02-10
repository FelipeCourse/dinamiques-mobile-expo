import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import {
  ArrowLinkComponent,
  ArticleFormComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ContentBoxComponent,
  HeroComponent,
  ProtectedRouteComponent,
  TitleComponent,
} from '@/components';

export default function ArticleAddAdminScreen(): JSX.Element {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Admin', path: '/admin' },
    { label: 'Artigos', path: '/admin/articles' },
    { label: 'Adicionar', path: '' },
  ];

  return (
    <ProtectedRouteComponent requiredRole={ROLES.teacher}>
      <FlatList
        ListHeaderComponent={
          <HeroComponent>
            <ArrowLinkComponent path="/(drawer)/admin/articles" />
            <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
            <HeroComponent.Header>
              <TitleComponent>Artigos</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={[{}]}
        keyExtractor={(item, index) => String(index)}
        renderItem={() => null}
        ListFooterComponent={
          <ContentBoxComponent>
            <ArticleFormComponent />
          </ContentBoxComponent>
        }
      />
    </ProtectedRouteComponent>
  );
}
