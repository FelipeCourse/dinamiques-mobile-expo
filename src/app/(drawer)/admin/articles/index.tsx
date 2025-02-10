import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import { PAGE_LIMIT, ROLES } from '@/constants';

import { ArticleModel } from '@/models';

import { usePagination } from '@/hooks';

import {
  ArticleTableComponent,
  ButtonComponent,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  TitleComponent,
} from '@/components';

export const s = StyleSheet.create({
  adminArticlesAddAction: {
    marginBottom: 40,
  },
  adminArticlesScreenContainer: {
    gap: 24,
  },
  adminArticlesNotAvailable: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    textAlign: 'center',
    color: colors.base[5](),
  },
});

export default function ArticlesAdminScreen(): JSX.Element {
  const { data, isLoading, loadMore, refreshData } =
    usePagination<ArticleModel>({
      endpoint: '/articles',
      limit: PAGE_LIMIT,
    });

  const AddButton = (): JSX.Element => {
    return (
      <ButtonComponent
        style={s.adminArticlesAddAction}
        onPress={() => router.push('/admin/articles/add')}
      >
        <ButtonComponent.Text variant="xs">Adicionar</ButtonComponent.Text>
      </ButtonComponent>
    );
  };

  const renderArticlesOrFeedback = (): JSX.Element => {
    if (isLoading && data.length === 0) {
      return <LoadingComponent />;
    }

    if (data.length) {
      return (
        <ContentBoxComponent>
          <AddButton />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ArticleTableComponent
                id={item.id}
                categoryId={item.category.id}
                categoryName={item.category.name}
                teacherName={item.teacher.name!}
                title={item.article.title}
                publishedLastDate={item.article.publishedLastDate}
                isPublished={item.article.isPublished}
                createdAt={item.article.createdAt}
                updatedAt={item.article.updatedAt}
              />
            )}
            ListFooterComponent={isLoading ? <LoadingComponent /> : null}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </ContentBoxComponent>
      );
    }

    return (
      <ContentBoxComponent>
        <AddButton />
        <Text style={s.adminArticlesNotAvailable}>
          Não há artigos disponíveis no momento.
        </Text>
      </ContentBoxComponent>
    );
  };

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData]),
  );

  return (
    <ProtectedRouteComponent requiredRole={ROLES.teacher}>
      <FlatList
        ListHeaderComponent={
          <HeroComponent>
            <HeroComponent.Header style={s.adminArticlesScreenContainer}>
              <TitleComponent>Artigos</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={() => null}
        ListFooterComponent={renderArticlesOrFeedback()}
      />
    </ProtectedRouteComponent>
  );
}
