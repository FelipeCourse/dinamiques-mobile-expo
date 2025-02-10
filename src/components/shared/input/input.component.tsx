import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { Text, TextInput, TextInputProps, TextProps, View } from 'react-native';

import { colors } from '@/styles';

import { s } from './input.style';

type InputComponentProps = TextInputProps;

function InputComponent({ children }: InputComponentProps): JSX.Element {
  return <View style={s.inputContainer}>{children}</View>;
}

type InputLabelComponentProps = TextProps;

function InputLabelComponent({
  children,
}: InputLabelComponentProps): JSX.Element {
  return <Text style={s.inputLabel}>{children}</Text>;
}

type InputFieldComponentProps = InputComponentProps & {
  fieldError?: FieldError;
};

function InputFieldComponent({
  secureTextEntry,
  placeholder,
  autoCorrect,
  value,
  onChangeText,
  style,
  children,
  fieldError,
  ...rest
}: InputFieldComponentProps): JSX.Element {
  const [isOnFocus, setIsOnFocus] = useState(false);

  return (
    <View style={s.inputFieldContainer}>
      <TextInput
        style={[s.inputField, style, isOnFocus && s.inputFieldOnFocus]}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={colors.base[9]()}
        autoCorrect={autoCorrect}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => setIsOnFocus(false)}
        {...rest}
      />
      {children}
      {fieldError && (
        <Text style={s.inputFiledError}>{fieldError.message}</Text>
      )}
    </View>
  );
}

type InputIconComponentProps = TextProps;

function InputIconComponent({
  children,
}: InputIconComponentProps): JSX.Element {
  return <Text style={s.inputLabel}>{children}</Text>;
}

InputComponent.Label = InputLabelComponent;
InputComponent.Field = InputFieldComponent;
InputComponent.Icon = InputIconComponent;

export { InputComponent };
