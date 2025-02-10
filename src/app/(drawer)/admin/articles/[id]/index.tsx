import { AxiosRequestConfig } from 'axios';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import { ArticleModel } from '@/models';

import { useFetch } from '@/hooks';

import {
  ArrowLinkComponent,
  ArticleFormComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  TitleComponent,
} from '@/components';

export default function ArticleEditAdminScreen(): JSX.Element | undefined {
  const { request, data, error, isLoading } = useFetch<ArticleModel>();
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  let breadcrumbItems: BreadcrumbItem[] = [];

  const getArticle = useCallback(async () => {
    const articlesConfig: AxiosRequestConfig = {
      method: 'GET',
      url: `/articles/${params.id}`,
    };

    await request(articlesConfig);
  }, [params.id, request]);

  useFocusEffect(
    useCallback(() => {
      getArticle();
    }, [getArticle]),
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
      { label: 'Artigos', path: '/admin/articles' },
      { label: 'Editar', path: '' },
    ];

    return (
      data && (
        <ProtectedRouteComponent requiredRole={ROLES.teacher}>
          <FlatList
            ListHeaderComponent={
              <HeroComponent>
                <ArrowLinkComponent path="/(drawer)/admin/articles" />
                <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
                <HeroComponent.Header>
                  <TitleComponent>{data.article.title}</TitleComponent>
                </HeroComponent.Header>
              </HeroComponent>
            }
            data={[{}]}
            keyExtractor={(item, index) => String(index)}
            renderItem={() => null}
            ListFooterComponent={
              <ContentBoxComponent>
                <ArticleFormComponent article={data} isUpdate />
              </ContentBoxComponent>
            }
          />
        </ProtectedRouteComponent>
      )
    );
  }
}
