import { ViewProps } from 'react-native';
import Markdown from 'react-native-markdown-display';

import { s } from './article-content-renderer.style';

type ArticleContentRendererComponentProps = ViewProps & {
  content: string;
};

export function ArticleContentRendererComponent({
  content,
}: ArticleContentRendererComponentProps): JSX.Element {
  return <Markdown style={s}>{content}</Markdown>;
}
