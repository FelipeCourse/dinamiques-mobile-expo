import { AxiosRequestConfig } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize } from '@/styles';

import { ArticleModel } from '@/models';

import { useFetch } from '@/hooks';

import {
  ArrowLinkComponent,
  ArticleCardComponent,
  ArticleContentRendererComponent,
  ArticlesRecommendationComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ContentBoxComponent,
  HeroComponent,
  LoadingComponent,
  TitleComponent,
} from '@/components';

export default function ArticleDetailsScreen(): JSX.Element | null | undefined {
  const { request, data, error, isLoading } = useFetch<ArticleModel[]>();
  const [article, setArticle] = useState<ArticleModel | null>();
  const [recommendedArticles, setRecommendedArticles] =
    useState<ArticleModel[]>();

  const params = useLocalSearchParams<{ slug: string }>();

  let breadcrumbItems: BreadcrumbItem[] = [];

  const getArticles = useCallback(async () => {
    const articlesConfig: AxiosRequestConfig = {
      method: 'GET',
      url: '/articles',
    };

    await request!(articlesConfig);
  }, [request]);

  const getArticleBySlug = useCallback(() => {
    if (data && data.length) {
      const articleBySlug = data.find(
        (articleItem) => articleItem.article.slug === params.slug,
      );

      setArticle(articleBySlug || null);
    }
  }, [data, params.slug]);

  const getRecommendedArticlesByCategory = useCallback(() => {
    const articles = data
      ? data.filter(
          (recommendedArticle) =>
            recommendedArticle.category.name === article?.category.name &&
            recommendedArticle.id !== article.id,
        )
      : [];

    setRecommendedArticles(articles);
  }, [article?.category.name, article?.id, data]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  useEffect(() => {
    if (data) {
      getArticleBySlug();
      getRecommendedArticlesByCategory();
    }
  }, [data, getArticleBySlug, getRecommendedArticlesByCategory]);

  useEffect(() => {
    if (article === null || error) {
      router.back();
    }
  }, [article, error]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (article) {
    breadcrumbItems = [
      { label: 'blog', path: '/blog' },
      { label: article.category.name, path: '/blog' },
      { label: article.article.title, path: '' },
    ];
  }

  const s = StyleSheet.create({
    articleDetailsTitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xs,
      lineHeight: fontSize['xs-lh'],
      color: colors.base[5](),
    },
    articleDetailsFooter: {
      flexDirection: 'row',
      columnGap: 60,
    },
    articleDetailsRecommended: {
      marginTop: 80,
      paddingTop: 80,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: colors.base[14](),
    },
  });

  return (
    article && (
      <>
        <FlatList
          ListHeaderComponent={
            <HeroComponent
              backgroundImage={{
                source: { uri: article.article.highlightImageUrl },
              }}
            >
              <ArrowLinkComponent path="/blog" />
              <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
              <HeroComponent.Header>
                <TitleComponent hasDotDecorator>
                  {article.article.title}
                </TitleComponent>
              </HeroComponent.Header>
              <HeroComponent.Content>
                <Text style={s.articleDetailsTitle}>
                  {article.article.summary}
                </Text>
              </HeroComponent.Content>
              <HeroComponent.Footer style={s.articleDetailsFooter}>
                <ArticleCardComponent.Metadata
                  authorName={article.teacher.name!}
                  publishLastDate={article.article.publishedLastDate}
                />
                <ArticleCardComponent.ReadingTime
                  readingTime={article.article.readingTime}
                />
              </HeroComponent.Footer>
            </HeroComponent>
          }
          data={[{}]}
          keyExtractor={(item, index) => String(index)}
          renderItem={() => null}
          ListFooterComponent={
            <>
              <ContentBoxComponent>
                <ArticleContentRendererComponent
                  content={article.article.content}
                />
              </ContentBoxComponent>
              {recommendedArticles?.length ? (
                <View style={s.articleDetailsRecommended}>
                  <ArticlesRecommendationComponent
                    articles={recommendedArticles}
                  />
                </View>
              ) : null}
            </>
          }
        />
      </>
    )
  );
}
