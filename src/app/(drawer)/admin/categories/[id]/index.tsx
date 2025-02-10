import { AxiosRequestConfig } from 'axios';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import { CategoryModel } from '@/models';

import { useFetch } from '@/hooks';

import {
  ArrowLinkComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  CategoryFormComponent,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  TitleComponent,
} from '@/components';

export default function CategoryEditAdminScreen(): JSX.Element | undefined {
  const { request, data, error, isLoading } = useFetch<CategoryModel>();
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  let breadcrumbItems: BreadcrumbItem[] = [];

  const getCategory = useCallback(async () => {
    const categoriesConfig: AxiosRequestConfig = {
      method: 'GET',
      url: `/categories/${params.id}`,
    };

    await request(categoriesConfig);
  }, [params.id, request]);

  useFocusEffect(
    useCallback(() => {
      getCategory();
    }, [getCategory]),
  );

  useEffect(() => {
    if (error) {
      router.back();
    }
  }, [error, router]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (data) {
    breadcrumbItems = [
      { label: 'Admin', path: '/admin' },
      { label: 'Categorias', path: '/admin/categories' },
      { label: 'Editar', path: '' },
    ];

    return (
      data && (
        <ProtectedRouteComponent requiredRole={ROLES.teacher}>
          <FlatList
            ListHeaderComponent={
              <HeroComponent>
                <ArrowLinkComponent path="/(drawer)/admin/categories" />
                <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
                <HeroComponent.Header>
                  <TitleComponent>{data.name}</TitleComponent>
                </HeroComponent.Header>
              </HeroComponent>
            }
            data={[{}]}
            keyExtractor={(item, index) => String(index)}
            renderItem={() => null}
            ListFooterComponent={
              <ContentBoxComponent>
                <CategoryFormComponent category={data} isUpdate />
              </ContentBoxComponent>
            }
          />
        </ProtectedRouteComponent>
      )
    );
  }
}
