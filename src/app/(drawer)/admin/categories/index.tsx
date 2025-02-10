import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import { PAGE_LIMIT, ROLES } from '@/constants';

import { CategoryModel } from '@/models';

import { usePagination } from '@/hooks';

import {
  ButtonComponent,
  CategoryTableComponent,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  TitleComponent,
} from '@/components';

export const s = StyleSheet.create({
  adminCategoriesAddAction: {
    marginBottom: 40,
  },
  adminCategoriesScreenContainer: {
    gap: 24,
  },
  adminCategoriesNotAvailable: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    textAlign: 'center',
    color: colors.base[5](),
  },
});

export default function AdminCategoriesScreen(): JSX.Element {
  const { data, isLoading, loadMore, refreshData } =
    usePagination<CategoryModel>({
      endpoint: '/categories',
      limit: PAGE_LIMIT,
    });

  const AddButton = (): JSX.Element => {
    return (
      <ButtonComponent
        style={s.adminCategoriesAddAction}
        onPress={() => router.push('/admin/categories/add')}
      >
        <ButtonComponent.Text variant="xs">Adicionar</ButtonComponent.Text>
      </ButtonComponent>
    );
  };

  const renderCategoriesOrFeedback = (): JSX.Element => {
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
              <CategoryTableComponent
                id={item.id}
                name={item.name}
                color={item.color}
                isActive={item.isActive}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
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
        <Text style={s.adminCategoriesNotAvailable}>
          Não há categorias disponíveis no momento.
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
            <HeroComponent.Header style={s.adminCategoriesScreenContainer}>
              <TitleComponent>Categorias</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={() => null}
        ListFooterComponent={renderCategoriesOrFeedback()}
      />
    </ProtectedRouteComponent>
  );
}
