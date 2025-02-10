import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { colors } from '@/styles';

import { s } from './button.style';

type ButtonComponentProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

function ButtonComponent({
  style,
  isLoading,
  children,
  ...rest
}: ButtonComponentProps): JSX.Element {
  return (
    <TouchableOpacity
      style={[s.buttonContainer, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <View style={s.buttonLoadingContainer}>
          <ActivityIndicator size="small" color={colors.base[10]()} />
        </View>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

type ButtonTextComponentProps = TextProps & {
  variant?: 'xs' | 'default';
};

function ButtonTextComponent({
  variant = 'default',
  style,
  children,
}: ButtonTextComponentProps): JSX.Element {
  return (
    <Text
      style={[s.buttonText, variant === 'xs' && s.buttonTextExtraSmall, style]}
    >
      {children}
    </Text>
  );
}

ButtonComponent.Text = ButtonTextComponent;

export { ButtonComponent };
