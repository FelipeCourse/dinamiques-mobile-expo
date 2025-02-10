import { View, ViewProps } from 'react-native';

import { s } from './form-container.style';

type FormContainerComponentProps = ViewProps;

export function FormContainerComponent({
  children,
}: FormContainerComponentProps): JSX.Element {
  return <View style={s.formContainer}>{children}</View>;
}
