import { AxiosRequestConfig } from 'axios';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ROLES } from '@/constants';

import { StudentModel } from '@/models';

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
  StudentFormComponent,
  TitleComponent,
} from '@/components';

export default function StudentEditAdminScreen(): JSX.Element | undefined {
  const { userData } = useAuthContext();
  const { request, data, error, isLoading } = useFetch<StudentModel>();
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  let breadcrumbItems: BreadcrumbItem[] = [];

  const getStudent = useCallback(async () => {
    const studentConfig: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: `/students/${params.id}`,
    };

    await request(studentConfig);
  }, [params.id, request, userData?.accessToken]);

  useFocusEffect(
    useCallback(() => {
      getStudent();
    }, [getStudent]),
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
      { label: 'Alunos', path: '/admin/students' },
      { label: 'Editar', path: '' },
    ];

    return (
      data && (
        <ProtectedRouteComponent requiredRole={ROLES.teacher}>
          <FlatList
            ListHeaderComponent={
              <HeroComponent>
                <ArrowLinkComponent path="/(drawer)/admin/students" />
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
                <StudentFormComponent student={data} isUpdate />
              </ContentBoxComponent>
            }
          />
        </ProtectedRouteComponent>
      )
    );
  }
}
