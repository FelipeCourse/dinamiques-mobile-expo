import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import { PAGE_LIMIT, ROLES } from '@/constants';

import { StudentModel } from '@/models';

import { usePagination } from '@/hooks';

import {
  ButtonComponent,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  StudentTableComponent,
  TitleComponent,
} from '@/components';

export const s = StyleSheet.create({
  adminStudentsAddAction: {
    marginBottom: 40,
  },
  adminStudentsScreenContainer: {
    gap: 24,
  },
  adminStudentsNotAvailable: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize['md-lh'],
    textAlign: 'center',
    color: colors.base[5](),
  },
});

export default function StudentsAdminScreen(): JSX.Element {
  const { data, isLoading, loadMore, refreshData } =
    usePagination<StudentModel>({
      endpoint: '/students',
      limit: PAGE_LIMIT,
    });

  const AddButton = (): JSX.Element => {
    return (
      <ButtonComponent
        style={s.adminStudentsAddAction}
        onPress={() => router.push('/admin/students/add')}
      >
        <ButtonComponent.Text variant="xs">Adicionar</ButtonComponent.Text>
      </ButtonComponent>
    );
  };

  const renderStudentsOrFeedback = (): JSX.Element => {
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
              <StudentTableComponent
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
        <Text style={s.adminStudentsNotAvailable}>
          Não há alunos disponíveis no momento.
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
            <HeroComponent.Header style={s.adminStudentsScreenContainer}>
              <TitleComponent>Alunos</TitleComponent>
            </HeroComponent.Header>
          </HeroComponent>
        }
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={() => null}
        ListFooterComponent={renderStudentsOrFeedback()}
      />
    </ProtectedRouteComponent>
  );
}
