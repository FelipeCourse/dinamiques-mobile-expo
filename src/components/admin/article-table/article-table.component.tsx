import { router } from 'expo-router';
import { Alert, Platform, Text, View, ViewProps } from 'react-native';

import { formatDateAuditFields } from '@/libs';

import { ArticleModel, ResourceTableModel } from '@/models';

import { useArticle, useFetch } from '@/hooks';

import { ResourceTableComponent } from '@/components/shared/resource-table/resource-table.component';
import { s as resourceTableStyles } from '@/components/shared/resource-table/resource-table.style';

type ArticleTableComponentProps = ViewProps &
  ResourceTableModel & {
    categoryId: string;
    categoryName: string;
    teacherName: string;
    title: string;
    publishedLastDate: Date;
    isPublished: boolean;
  };

export function ArticleTableComponent({
  id,
  categoryId,
  categoryName,
  teacherName,
  title,
  publishedLastDate,
  isPublished,
  createdAt,
  updatedAt,
  ...rest
}: ArticleTableComponentProps): JSX.Element {
  const { request } = useFetch<ArticleModel>();
  const { onDelete } = useArticle({ request });

  const handleEdit = (): void => {
    router.navigate(`/admin/articles/${id}`);
  };

  const handleDelete = (): void => {
    if (Platform.OS === 'web') {
      const deleteConfirm = confirm(
        `Tem certeza que deseja remover?\nO artigo "${title}" será permanentemente removido.`,
      );

      if (deleteConfirm) {
        onDelete(id!);
        router.push('/admin');
      }
    } else {
      Alert.alert(
        'Tem certeza que deseja remover?',
        `O artigo "${title}" será permanentemente removido.`,
        [
          {
            text: 'Continuar',
            onPress: () => {
              onDelete(id!);
              router.push('/admin');
            },
          },
        ],
      );
    }
  };

  return (
    <ResourceTableComponent
      createdAt={createdAt}
      updatedAt={updatedAt}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      {...rest}
    >
      <View style={resourceTableStyles.resourceTableFieldContainer}>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldColumn,
          ]}
        >
          Categoria
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
          ]}
        >
          {categoryName}
        </Text>
      </View>
      <View style={resourceTableStyles.resourceTableFieldContainer}>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldColumn,
          ]}
        >
          Docente
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
          ]}
        >
          {teacherName}
        </Text>
      </View>
      <View style={resourceTableStyles.resourceTableFieldContainer}>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldColumn,
          ]}
        >
          Título
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={resourceTableStyles.resourceTableFieldContainer}>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldColumn,
          ]}
        >
          Última publicação
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
          ]}
        >
          {formatDateAuditFields(publishedLastDate)}
        </Text>
      </View>
      <View style={resourceTableStyles.resourceTableFieldContainer}>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldColumn,
          ]}
        >
          Publicado
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
            resourceTableStyles.resourceTableFieldIsActiveFalse,
            isPublished && resourceTableStyles.resourceTableFieldIsActiveTrue,
          ]}
        >
          {isPublished === true ? 'sim' : 'não'}
        </Text>
      </View>
    </ResourceTableComponent>
  );
}
