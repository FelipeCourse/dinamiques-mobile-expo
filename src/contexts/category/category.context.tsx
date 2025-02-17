import { createContext, useContext, useMemo, useState } from 'react';

import { handleSortByTerm } from '@/utils';

import { CategoryModel } from '@/models';

interface CategoryContextData {
  activeCategory: CategoryModel;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryModel>>;
}

interface CategoryContextReturn {
  activeCategory: CategoryModel;
  allActiveCategories: CategoryModel;
  handleCategoryFilter: (category: CategoryModel) => void;
  handleCategoriesAlphabetically: (
    categories: CategoryModel[],
  ) => CategoryModel[];
}

interface CategoryProviderProps {
  children: React.ReactNode;
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData,
);

export const allActiveCategories = {
  id: '0',
  name: 'todos',
  color: '#131313',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: '1',
  updatedBy: '1',
};

export function CategoryProvider({
  children,
}: CategoryProviderProps): JSX.Element {
  const [activeCategory, setActiveCategory] =
    useState<CategoryModel>(allActiveCategories);

  const value = useMemo(
    () => ({
      activeCategory,
      setActiveCategory,
    }),
    [activeCategory],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext(): CategoryContextReturn {
  if (useContext(CategoryContext) === undefined) {
    throw new Error(
      'useCategoryContext must be used within a CategoryProvider',
    );
  }

  const { activeCategory, setActiveCategory } = useContext(CategoryContext);

  const handleCategoryFilter = (category: CategoryModel) => {
    setActiveCategory(category);
  };

  const handleCategoriesAlphabetically = (
    categories: CategoryModel[],
  ): CategoryModel[] => {
    return handleSortByTerm(categories!, 'name');
  };

  return {
    activeCategory,
    allActiveCategories,
    handleCategoryFilter,
    handleCategoriesAlphabetically,
  };
}
