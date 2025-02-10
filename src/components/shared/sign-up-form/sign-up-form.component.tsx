import { Link } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';

import { UserModel } from '@/models';

import { useFetch, useSignUp } from '@/hooks';

import { ButtonComponent } from '../button/button.component';
import { FormContainerComponent } from '../form-container/form-containercomponent';
import { InputComponent } from '../input/input.component';
import { s } from './sign-up-form.style';

export function SignUpFormComponent(): JSX.Element {
  const { request, isLoading } = useFetch<UserModel>();
  const { signUpForm, control, errors, handleSubmit } = useSignUp({
    request,
  });

  return (
    <>
      <FormContainerComponent {...signUpForm}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Nome</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o seu nome completo"
                onChangeText={onChange}
                value={value}
                fieldError={errors.name}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Usuário</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o seu nome de usuário"
                onChangeText={onChange}
                value={value}
                fieldError={errors.username}
              />
            </InputComponent>
          )}
        />
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
          <ButtonComponent.Text>Registrar</ButtonComponent.Text>
        </ButtonComponent>
      </FormContainerComponent>
      <Link href={'/sign-in'} asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={s.signUpFormTip}>Já tem uma conta?, acesse aqui.</Text>
        </TouchableOpacity>
      </Link>
    </>
  );
}
