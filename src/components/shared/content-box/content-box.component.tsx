import { View, ViewProps } from 'react-native';

import { s } from './content-box.style';

type ContentBoxComponentProps = ViewProps;

export function ContentBoxComponent({
  children,
}: ContentBoxComponentProps): JSX.Element {
  return <View style={s.contentBoxContainer}>{children}</View>;
}
