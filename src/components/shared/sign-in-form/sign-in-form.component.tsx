import { Link } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';

import { UserModel } from '@/models';

import { useFetch, useSignIn } from '@/hooks';

import { ButtonComponent } from '../button/button.component';
import { FormContainerComponent } from '../form-container/form-containercomponent';
import { InputComponent } from '../input/input.component';
import { s } from './sign-in-form.style';

export function SignInFormComponent(): JSX.Element {
  const { request, isLoading } = useFetch<UserModel>();
  const { signInForm, control, errors, handleSubmit } = useSignIn({
    request,
  });

  return (
    <>
      <FormContainerComponent {...signInForm}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>E-mail</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o seu e-mail"
                onChangeText={onChange}
                value={value}
                fieldError={errors.email}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Senha</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite a sua senha"
                onChangeText={onChange}
                secureTextEntry
                value={value}
                fieldError={errors.password}
              />
            </InputComponent>
          )}
        />
        <ButtonComponent onPress={handleSubmit} isLoading={isLoading}>
          <ButtonComponent.Text>Entrar</ButtonComponent.Text>
        </ButtonComponent>
      </FormContainerComponent>
      <Link href={'/sign-up'} asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={s.signInFormTip}>Não tem uma conta?, acesse aqui.</Text>
        </TouchableOpacity>
      </Link>
    </>
  );
}
