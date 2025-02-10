import { FlatList, StyleSheet } from 'react-native';

import {
  ArticlesComponent,
  CategoriesComponent,
  ContentBoxComponent,
  HeroComponent,
  SearchInputComponent,
  TitleComponent,
} from '@/components';

export const s = StyleSheet.create({
  blogScreenHeader: {
    gap: 24,
  },
});

export default function BlogScreen(): JSX.Element {
  return (
    <FlatList
      ListHeaderComponent={
        <HeroComponent>
          <HeroComponent.Header style={s.blogScreenHeader}>
            <TitleComponent hasDotDecorator>
              Conhecimento ao alcance de todos
            </TitleComponent>
            <SearchInputComponent />
          </HeroComponent.Header>
        </HeroComponent>
      }
      data={[{}]}
      keyExtractor={(item, index) => String(index)}
      renderItem={() => null}
      ListFooterComponent={
        <ContentBoxComponent>
          <CategoriesComponent />
          <ArticlesComponent />
        </ContentBoxComponent>
      }
    />
  );
}
