import { router } from 'expo-router';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { handleRandomSelection, handleSortingDescendingByDate } from '@/utils';

import { ArticleModel } from '@/models';

import { TitleComponent } from '@/components/shared/title/title.component';

import { ArticleCardComponent } from '../article-card/article-card.component';
import { s } from './articles-recommendation.style';

type ArticlesRecommendationComponentProps = ViewProps & {
  articles: ArticleModel[];
};

export function ArticlesRecommendationComponent({
  articles,
  style,
}: ArticlesRecommendationComponentProps): JSX.Element {
  const recommendedArticles = handleSortingDescendingByDate(
    handleRandomSelection(articles).slice(0, 3),
    ({ article }) => article.publishedLastDate,
  );

  return (
    <GestureHandlerRootView style={[style]}>
      <TitleComponent hasBarDecorator>Recomendados</TitleComponent>
      <View style={s.articlesRecommendationContainer}>
        <FlatList
          data={recommendedArticles}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, category, teacher, article } }) => {
            const articleHighlightImageUrl =
              article.highlightImageUrl?.trim() || undefined;
            const articleAvatarImageUrl =
              teacher.avatarImageUrl?.trim() || undefined;

            return (
              <View style={s.articlesRecommendationItem}>
                <TouchableOpacity
                  onPress={() => router.navigate(`/blog/${article.slug}/`)}
                  activeOpacity={100}
                >
                  <ArticleCardComponent key={id}>
                    <ArticleCardComponent.Image
                      articleImage={{
                        source: { uri: articleHighlightImageUrl },
                      }}
                    />
                    <ArticleCardComponent.Header
                      category={category}
                      title={article.title}
                    />
                    <ArticleCardComponent.Content summary={article.summary} />
                    <ArticleCardComponent.Footer>
                      <ArticleCardComponent.Metadata
                        avatarImage={{
                          source: {
                            uri: articleAvatarImageUrl,
                          },
                        }}
                        authorName={teacher.name!}
                        publishLastDate={article.publishedLastDate}
                      />
                      <ArticleCardComponent.ReadingTime
                        readingTime={article.readingTime}
                      />
                    </ArticleCardComponent.Footer>
                  </ArticleCardComponent>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
