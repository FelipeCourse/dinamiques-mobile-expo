import { AxiosRequestConfig } from 'axios';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import { TeacherModel } from '@/models';

import { useAuthContext } from '@/contexts';

import { useFetch } from '@/hooks';

import {
  ArrowLinkComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  ProtectedRouteComponent,
  TeacherFormComponent,
  TitleComponent,
} from '@/components';

export default function TeacherEditAdminScreen(): JSX.Element | undefined {
  const { userData } = useAuthContext();
  const { request, data, error, isLoading } = useFetch<TeacherModel>();
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  let breadcrumbItems: BreadcrumbItem[] = [];

  const getTeacher = useCallback(async () => {
    const teacherConfig: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: `/teachers/${params.id}`,
    };

    await request(teacherConfig);
  }, [params.id, request, userData?.accessToken]);

  useFocusEffect(
    useCallback(() => {
      getTeacher();
    }, [getTeacher]),
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
      { label: 'Docentes', path: '/admin/teachers' },
      { label: 'Editar', path: '' },
    ];

    return (
      data && (
        <ProtectedRouteComponent requiredRole={ROLES.teacher}>
          <FlatList
            ListHeaderComponent={
              <HeroComponent>
                <ArrowLinkComponent path="/(drawer)/admin/teachers" />
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
                <TeacherFormComponent teacher={data} isUpdate />
              </ContentBoxComponent>
            }
          />
        </ProtectedRouteComponent>
      )
    );
  }
}
