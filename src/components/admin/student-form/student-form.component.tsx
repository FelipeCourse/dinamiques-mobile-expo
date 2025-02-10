import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { Switch, ViewProps } from 'react-native';

import { colors } from '@/styles';

import { StudentModel } from '@/models';

import { useFetch, useStudent } from '@/hooks';

import { ButtonComponent } from '@/components/shared/button/button.component';
import { FormContainerComponent } from '@/components/shared/form-container/form-containercomponent';
import { InputComponent } from '@/components/shared/input/input.component';

import { s } from './student-form.style';

type StudentFormComponentProps = ViewProps & {
  student?: StudentModel;
  isUpdate?: boolean;
};

export function StudentFormComponent({
  student,
  isUpdate,
}: StudentFormComponentProps): JSX.Element {
  const { request, isLoading } = useFetch<StudentModel>();
  const { studentForm, control, errors, handleSubmit, reset } = useStudent({
    request,
    student,
    isUpdate,
  });

  useFocusEffect(
    useCallback(() => {
      if (!student) {
        reset();
      }
    }, [reset, student]),
  );

  return (
    <>
      <FormContainerComponent {...studentForm}>
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
        {!student && (
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
        )}
        {!student && (
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
        )}
        {!student && (
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
        )}
        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <InputComponent>
              <InputComponent.Label>Ativo</InputComponent.Label>
              <Switch
                style={s.studentFormIsActive}
                trackColor={{
                  false: colors.base[8](),
                  true: colors.base.white(),
                }}
                thumbColor={colors.base[13]()}
                value={field.value}
                onValueChange={field.onChange}
                disabled={!student}
              />
            </InputComponent>
          )}
        />
        <ButtonComponent onPress={handleSubmit} isLoading={isLoading}>
          <ButtonComponent.Text>Salvar</ButtonComponent.Text>
        </ButtonComponent>
      </FormContainerComponent>
    </>
  );
}
