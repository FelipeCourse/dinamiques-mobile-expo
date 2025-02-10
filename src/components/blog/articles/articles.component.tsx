import { router } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { ArticleModel } from '@/models';

import { useArticleContext } from '@/contexts';

import { ArticleCardComponent } from '../article-card/article-card.component';
import { s } from './articles.style';

export function ArticlesComponent(): JSX.Element {
  const { filteredArticles } = useArticleContext();

  const renderArticlesOrFeedback = ({
    id,
    category,
    teacher,
    article,
  }: ArticleModel): JSX.Element | null => {
    const articleHighlightImageUrl =
      article.highlightImageUrl?.trim() || undefined;
    const articleAvatarImageUrl = teacher.avatarImageUrl?.trim() || undefined;

    if (article.isPublished) {
      return (
        <View style={s.articlesItem}>
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
    }

    return null;
  };

  return (
    <View style={s.articlesContainer}>
      {filteredArticles.length > 0 ? (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderArticlesOrFeedback(item)}
        />
      ) : (
        <Text style={s.articlesNotAvailable}>
          Não há artigos disponíveis no momento.
        </Text>
      )}
    </View>
  );
}
