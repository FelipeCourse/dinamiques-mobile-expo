import { router } from 'expo-router';
import { Alert, Platform, Text, View, ViewProps } from 'react-native';

import { CategoryModel, ResourceTableModel } from '@/models';

import { useCategory, useFetch } from '@/hooks';

import { ResourceTableComponent } from '@/components/shared/resource-table/resource-table.component';
import { s as resourceTableStyles } from '@/components/shared/resource-table/resource-table.style';

import { s } from './category-table.style';

type CategoryTableComponentProps = ViewProps &
  ResourceTableModel & {
    name: string;
    color: string;
  };

export function CategoryTableComponent({
  id,
  name,
  color,
  isActive,
  createdAt,
  updatedAt,
  ...rest
}: CategoryTableComponentProps): JSX.Element {
  const { request } = useFetch<CategoryModel>();
  const { onDelete } = useCategory({ request });

  const handleEdit = (): void => {
    router.navigate(`/admin/categories/${id}`);
  };

  const handleDelete = (): void => {
    if (Platform.OS === 'web') {
      const deleteConfirm = confirm(
        `Tem certeza que deseja remover?\nA categoria "${name}" será permanentemente removida.`,
      );

      if (deleteConfirm) {
        onDelete(id!);
        router.push('/admin');
      }
    } else {
      Alert.alert(
        'Tem certeza que deseja remover?',
        `A categoria "${name}" será permanentemente removida.`,
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
      isActive={isActive}
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
          Nome
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
          ]}
        >
          {name}
        </Text>
      </View>
      <View style={resourceTableStyles.resourceTableFieldContainer}>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldColumn,
          ]}
        >
          Cor
        </Text>
        <Text
          style={[
            resourceTableStyles.resourceTableFieldCommon,
            resourceTableStyles.resourceTableFieldValue,
          ]}
        >
          <View style={[s.categoryTableColor, { backgroundColor: color }]} />{' '}
          {color}
        </Text>
      </View>
    </ResourceTableComponent>
  );
}
