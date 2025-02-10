import {
  Image,
  ImageProps,
  Text,
  TextProps,
  View,
  ViewProps,
} from 'react-native';
import { ClockIcon, UserIcon } from 'react-native-heroicons/outline';

import { colors } from '@/styles';

import { formatPublishLastDate } from '@/libs';

import { formatToHoursAndMinutes } from '@/utils';

import { SectionDecoratorComponent } from '@/components/shared/section-decorator/section-decorator.component';

import { s } from './article-card.style';

type ArticleCardComponentProps = ViewProps & {};

function ArticleCardComponent({
  style,
  children,
}: ArticleCardComponentProps): JSX.Element {
  return <View style={[s.articleCardContainer, style]}>{children}</View>;
}

type ArticleCardImageComponentProps = TextProps & {
  articleImage?: ImageProps;
};

function ArticleCardImageComponent({
  articleImage,
}: ArticleCardImageComponentProps): JSX.Element {
  return (
    <View style={s.articleCardImageContainer}>
      {articleImage ? (
        <Image
          style={s.articleCardImage}
          source={articleImage?.source}
          resizeMode="cover"
        />
      ) : (
        <View style={[s.articleCardImageContainer, s.articleCardImage]} />
      )}
      <SectionDecoratorComponent fill={colors.base[15]()} />
    </View>
  );
}

type ArticleCardHeaderComponentProps = ViewProps & {
  category: { name: string; color: string };
  title: string;
};

function ArticleCardHeaderComponent({
  category,
  title,
  style,
}: ArticleCardHeaderComponentProps): JSX.Element {
  return (
    <View style={[s.articleCardHeader, style]}>
      <View style={s.articleCardHeaderCategoryContainer}>
        <View
          style={[
            s.articleCardHeaderCategoryDecorator,
            { backgroundColor: category.color },
          ]}
        />
        <Text style={s.articleCardHeaderCategoryName}>{category.name}</Text>
      </View>
      <Text style={s.articleCardHeaderTitle}>{title}</Text>
    </View>
  );
}

type ArticleCardContentComponentProps = TextProps & {
  summary: string;
};

function ArticleCardContentComponent({
  summary,
  style,
}: ArticleCardContentComponentProps): JSX.Element {
  return <Text style={[s.articleCardContentSummary, style]}>{summary}</Text>;
}

type ArticleCardFooterComponentProps = ViewProps;

function ArticleCardFooterComponent({
  style,
  children,
}: ArticleCardFooterComponentProps): JSX.Element {
  return <View style={[s.articleCardFooter, style]}>{children}</View>;
}

type ArticleCardAuthorAvatarComponentProps = {
  avatarImage?: { source: { uri: string | undefined } };
};

function ArticleCardAuthorAvatarComponent({
  avatarImage,
}: ArticleCardAuthorAvatarComponentProps): JSX.Element {
  return avatarImage?.source.uri !== undefined ? (
    <Image
      style={s.articleCardAuthorAvatar}
      source={avatarImage.source}
      resizeMode="cover"
    />
  ) : (
    <View style={s.articleCardAuthorAvatar}>
      <UserIcon fill={colors.primary[5]()} />
    </View>
  );
}

type ArticleCardAuthorNameComponentProps = TextProps & {
  authorName: string;
};

function ArticleCardAuthorNameComponent({
  authorName,
  style,
}: ArticleCardAuthorNameComponentProps): JSX.Element {
  return <Text style={[s.articleCardAuthorName, style]}>{authorName}</Text>;
}

type ArticleCardPublishLastDateComponentProps = TextProps & {
  publishLastDate: Date;
};

function ArticleCardPublishLastDateComponent({
  publishLastDate,
  style,
}: ArticleCardPublishLastDateComponentProps): JSX.Element {
  return (
    <Text style={[s.articleCardPublishLastDate, style]}>
      {formatPublishLastDate(publishLastDate)}
    </Text>
  );
}

type ArticleCardMetadataComponentProps = ViewProps & {
  authorName: string;
  avatarImage?: { source: { uri: string | undefined } };
  publishLastDate: Date;
};

function ArticleCardMetadataComponent({
  authorName,
  avatarImage,
  publishLastDate,
  style,
}: ArticleCardMetadataComponentProps): JSX.Element {
  return (
    <View style={[s.articleCardMetadataContainer, style]}>
      <ArticleCardAuthorAvatarComponent avatarImage={avatarImage} />
      <View style={s.articleCardAuthorMetadataContainer}>
        <ArticleCardAuthorNameComponent authorName={authorName} />
        <ArticleCardPublishLastDateComponent
          publishLastDate={new Date(publishLastDate)}
        />
      </View>
    </View>
  );
}

type ArticleCardReadingTimeComponentProps = ViewProps & {
  readingTime: number;
};

function ArticleCardReadingTimeComponent({
  readingTime,
  style,
}: ArticleCardReadingTimeComponentProps): JSX.Element {
  return (
    <View style={[s.readingTimeContainer, style]}>
      <ClockIcon color={colors.primary[3]()} size={12} />
      <Text style={s.readingTimeText}>
        {formatToHoursAndMinutes(readingTime)}
      </Text>
    </View>
  );
}

ArticleCardComponent.Image = ArticleCardImageComponent;
ArticleCardComponent.Header = ArticleCardHeaderComponent;
ArticleCardComponent.Content = ArticleCardContentComponent;
ArticleCardComponent.Footer = ArticleCardFooterComponent;
ArticleCardComponent.AuthorAvatar = ArticleCardAuthorAvatarComponent;
ArticleCardComponent.AuthorName = ArticleCardAuthorNameComponent;
ArticleCardComponent.PublishLastDate = ArticleCardPublishLastDateComponent;
ArticleCardComponent.Metadata = ArticleCardMetadataComponent;
ArticleCardComponent.ReadingTime = ArticleCardReadingTimeComponent;

export { ArticleCardComponent };
