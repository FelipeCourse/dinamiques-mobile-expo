import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import { PAGE_LIMIT, ROLES } from '@/constants';

import { TeacherModel } from '@/models';

import { usePagination } from '@/hooks';

import {
  ButtonComponent,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  TeacherTableComponent,
  TitleComponent,
} from '@/components';

export const s = StyleSheet.create({
  adminTeachersAddAction: {
    marginBottom: 40,
  },
  adminTeachersScreenContainer: {
    gap: 24,
  },
  adminTeachersNotAvailable: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    textAlign: 'center',
    color: colors.base[5](),
  },
});

export default function TeachersAdminScreen(): JSX.Element {
  const { data, isLoading, loadMore, refreshData } =
    usePagination<TeacherModel>({
      endpoint: '/teachers',
      limit: PAGE_LIMIT,
    });

  const AddButton = (): JSX.Element => {
    return (
      <ButtonComponent
        style={s.adminTeachersAddAction}
        onPress={() => router.push('/admin/teachers/add')}
      >
        <ButtonComponent.Text variant="xs">Adicionar</ButtonComponent.Text>
      </ButtonComponent>
    );
  };

  const renderTeachersOrFeedback = (): JSX.Element => {
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
              <TeacherTableComponent
                id={item.id}
                name={item.name}
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
        <Text style={s.adminTeachersNotAvailable}>
          Não há docentes disponíveis no momento.
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
            <HeroComponent.Header style={s.adminTeachersScreenContainer}>
              <TitleComponent>Docentes</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={() => null}
        ListFooterComponent={renderTeachersOrFeedback()}
      />
    </ProtectedRouteComponent>
  );
}
