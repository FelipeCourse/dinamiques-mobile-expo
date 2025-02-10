import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Switch, ViewProps } from 'react-native';
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';

import { colors } from '@/styles';

import { CategoryModel } from '@/models';

import { useCategory, useFetch } from '@/hooks';

import { ButtonComponent } from '@/components/shared/button/button.component';
import { FormContainerComponent } from '@/components/shared/form-container/form-containercomponent';
import { InputComponent } from '@/components/shared/input/input.component';

import { s } from './category-form.style';

type CategoryFormComponentProps = ViewProps & {
  category?: CategoryModel;
  isUpdate?: boolean;
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export function CategoryFormComponent({
  category,
  isUpdate,
}: CategoryFormComponentProps): JSX.Element {
  const { request, isLoading } = useFetch<CategoryModel>();
  const { categoryForm, control, errors, handleSubmit, reset } = useCategory({
    request,
    category,
    isUpdate,
  });
  const [categoryColor, setCategoryColor] = useState<string>(
    categoryForm.getValues('color'),
  );

  const onSelectColor = ({ hex }) => {
    setCategoryColor(hex);
  };

  useEffect(() => {
    categoryForm.setValue('color', categoryColor);
  }, [categoryColor, categoryForm, categoryForm.setValue]);

  useFocusEffect(
    useCallback(() => {
      if (!category) {
        reset();
      }
    }, [reset, category]),
  );

  return (
    <>
      <FormContainerComponent {...categoryForm}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Nome</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o nome"
                onChangeText={onChange}
                value={value}
                fieldError={errors.name}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="color"
          render={() => (
            <InputComponent>
              <InputComponent.Label>Cor</InputComponent.Label>
              <ColorPicker value={categoryColor} onChange={onSelectColor}>
                <Panel1 />
                <HueSlider />
              </ColorPicker>
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <InputComponent>
              <InputComponent.Label>Ativo</InputComponent.Label>
              <Switch
                style={s.categoryFormIsActive}
                trackColor={{
                  false: colors.base[8](),
                  true: colors.base.white(),
                }}
                thumbColor={colors.base[13]()}
                value={field.value}
                onValueChange={field.onChange}
                disabled={!category}
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
