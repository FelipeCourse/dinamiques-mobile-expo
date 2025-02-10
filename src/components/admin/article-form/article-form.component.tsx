import { Picker } from '@react-native-picker/picker';
import { AxiosRequestConfig } from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Switch, ViewProps } from 'react-native';
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';

import { colors } from '@/styles';

import { handleSortByTerm } from '@/utils';

import { ArticleModel, CategoryModel } from '@/models';

import { useArticle, useFetch } from '@/hooks';

import { ButtonComponent } from '@/components/shared/button/button.component';
import { FormContainerComponent } from '@/components/shared/form-container/form-containercomponent';
import { InputComponent } from '@/components/shared/input/input.component';
import { PickerComponent } from '@/components/shared/picker/picker.component';

import { s } from './article-form.style';

type ArticleFormComponentProps = ViewProps & {
  article?: ArticleModel;
  isUpdate?: boolean;
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export function ArticleFormComponent({
  article,
  isUpdate,
}: ArticleFormComponentProps): JSX.Element {
  let categoriesSortedAlphabetically: CategoryModel[] = [];
  const fetchCategories = useFetch<CategoryModel[]>();
  const { request, isLoading } = useFetch<ArticleModel>();
  const { articleForm, control, errors, handleSubmit, reset } = useArticle({
    request,
    article,
    isUpdate,
  });
  const [categoryId, setCategoryId] = useState<string>(
    articleForm.getValues('categoryId'),
  );

  const getCategories = useCallback(async () => {
    const categoriesConfig: AxiosRequestConfig = {
      method: 'GET',
      url: `/categories`,
    };

    await fetchCategories.request!(categoriesConfig);
  }, [fetchCategories.request]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (fetchCategories.data && fetchCategories.data.length) {
    categoriesSortedAlphabetically = handleSortByTerm(
      fetchCategories.data,
      'name',
    ).filter((category) => category.isActive);
  }

  useEffect(() => {
    articleForm.setValue('categoryId', categoryId);
  }, [articleForm, categoryId]);

  useFocusEffect(
    useCallback(() => {
      if (!article) {
        reset();
      }
    }, [reset, article]),
  );

  return (
    <>
      <FormContainerComponent {...articleForm}>
        <Controller
          control={control}
          name="categoryId"
          render={() => (
            <InputComponent>
              <InputComponent.Label>Categoria</InputComponent.Label>
              <PickerComponent
                selectedValue={categoryId}
                setSelectedValue={setCategoryId}
              >
                {categoriesSortedAlphabetically?.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </PickerComponent>
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Título</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o título"
                onChangeText={onChange}
                value={value}
                fieldError={errors.title}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="summary"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Resumo</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o resumo"
                multiline={true}
                onChangeText={onChange}
                value={value}
                fieldError={errors.summary}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="readingTime"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Tempo de leitura</InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite o tempo de leitura"
                onChangeText={onChange}
                value={value.toString()}
                fieldError={errors.readingTime}
              />
            </InputComponent>
          )}
        />
        {/* TODO: change to rich text edit */}
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>Conteúdo</InputComponent.Label>
              <InputComponent.Field
                style={s.articleFormContent}
                placeholder="Digite o conteúdo"
                multiline={true}
                onChangeText={onChange}
                value={value}
                fieldError={errors.content}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="highlightImageUrl"
          render={({ field: { onChange, value } }) => (
            <InputComponent>
              <InputComponent.Label>
                Url da imagem de destaque
              </InputComponent.Label>
              <InputComponent.Field
                placeholder="Digite a url da imagem de destaque"
                onChangeText={onChange}
                value={value}
                fieldError={errors.highlightImageUrl}
              />
            </InputComponent>
          )}
        />
        <Controller
          control={control}
          name="isPublished"
          render={({ field }) => (
            <InputComponent>
              <InputComponent.Label>Publicado</InputComponent.Label>
              <Switch
                style={s.articleFormIsActive}
                trackColor={{
                  false: colors.base[8](),
                  true: colors.base.white(),
                }}
                thumbColor={colors.base[13]()}
                value={field.value}
                onValueChange={field.onChange}
                disabled={!article}
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
