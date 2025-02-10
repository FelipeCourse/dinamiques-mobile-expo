import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { Switch, ViewProps } from 'react-native';

import { colors } from '@/styles';

import { TeacherModel } from '@/models';

import { useFetch, useTeacher } from '@/hooks';

import { ButtonComponent } from '@/components/shared/button/button.component';
import { FormContainerComponent } from '@/components/shared/form-container/form-containercomponent';
import { InputComponent } from '@/components/shared/input/input.component';

import { s } from './teacher-form.style';

type TeacherFormComponentProps = ViewProps & {
  teacher?: TeacherModel;
  isUpdate?: boolean;
};

export function TeacherFormComponent({
  teacher,
  isUpdate,
}: TeacherFormComponentProps): JSX.Element {
  const { request, isLoading } = useFetch<TeacherModel>();
  const { teacherForm, control, errors, handleSubmit, reset } = useTeacher({
    request,
    teacher,
    isUpdate,
  });

  useFocusEffect(
    useCallback(() => {
      if (!teacher) {
        reset();
      }
    }, [reset, teacher]),
  );

  return (
    <>
      <FormContainerComponent {...teacherForm}>
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
        {!teacher && (
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
        {!teacher && (
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
        {!teacher && (
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
                style={s.teacherFormIsActive}
                trackColor={{
                  false: colors.base[8](),
                  true: colors.base.white(),
                }}
                thumbColor={colors.base[13]()}
                value={field.value}
                onValueChange={field.onChange}
                disabled={!teacher}
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
