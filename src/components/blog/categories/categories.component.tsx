import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect } from 'react';
import { FlatList, Text } from 'react-native';

import { CategoryModel } from '@/models';

import { useCategoryContext } from '@/contexts';

import { useFetch } from '@/hooks';

import { LoadingComponent } from '@/components/shared/loading/loading.component';

import { CategoryComponent } from '../category/category.component';
import { s } from './categories.style';

export function CategoriesComponent(): JSX.Element {
  const { request, data, isLoading } = useFetch<CategoryModel[]>();
  const {
    allActiveCategories,
    activeCategory,
    handleCategoryFilter,
    handleCategoriesAlphabetically,
  } = useCategoryContext();

  let categoriesAlphabeticalOrder: CategoryModel[] = [];

  const getCategories = useCallback(async () => {
    const categoriesConfig: AxiosRequestConfig = {
      method: 'GET',
      url: '/categories',
    };

    await request!(categoriesConfig);
  }, [request]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (data && data.length) {
    categoriesAlphabeticalOrder = handleCategoriesAlphabetically(data);

    return (
      <FlatList
        style={s.categoriesContainer}
        data={categoriesAlphabeticalOrder}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryComponent
            name={item.name}
            color={item.color}
            onPress={() => handleCategoryFilter(item)}
            isSelected={item.id === activeCategory.id}
          />
        )}
        ListHeaderComponent={
          <CategoryComponent
            name={allActiveCategories.name}
            color={allActiveCategories.color}
            onPress={() => handleCategoryFilter(allActiveCategories)}
            isSelected={allActiveCategories.id === activeCategory.id}
          />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  return <Text>Não há categorias disponíveis no momento.</Text>;
}
