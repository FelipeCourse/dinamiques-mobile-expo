import { AxiosRequestConfig } from 'axios';
import { Drawer } from 'expo-router/drawer';
import { useCallback, useEffect } from 'react';

import { ArticleModel } from '@/models';

import { ArticleProvider, CategoryProvider } from '@/contexts';

import { useFetch } from '@/hooks';

import { DrawerContainerComponent } from '@/components';

export default function DrawerLayout() {
  const { request, data } = useFetch<ArticleModel[]>();

  const getArticles = useCallback(async () => {
    const articlesConfig: AxiosRequestConfig = {
      method: 'GET',
      url: '/articles',
      params: { limit: 100 },
    };

    await request!(articlesConfig);
  }, [request]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const screens = [
    {
      name: 'index',
      label: 'Blog',
    },
  ];

  const filteredScreens = screens.filter(
    (screen) => !screen.name.includes('/[slug]'),
  );

  return (
    <CategoryProvider>
      <ArticleProvider fetchedArticles={data || []}>
        <DrawerContainerComponent>
          {filteredScreens.map((screen) => {
            return (
              <Drawer.Screen
                key={screen.name}
                name={screen.name}
                options={{
                  drawerLabel: screen.label,
                }}
              />
            );
          })}
        </DrawerContainerComponent>
      </ArticleProvider>
    </CategoryProvider>
  );
}
