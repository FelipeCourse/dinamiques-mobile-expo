import { router } from 'expo-router';
import { Alert, Platform, Text, View, ViewProps } from 'react-native';

import { ResourceTableModel, StudentModel } from '@/models';

import { useFetch, useStudent } from '@/hooks';

import { ResourceTableComponent } from '@/components/shared/resource-table/resource-table.component';
import { s as resourceTableStyles } from '@/components/shared/resource-table/resource-table.style';

type StudentTableComponentProps = ViewProps &
  ResourceTableModel & {
    name: string;
  };

export function StudentTableComponent({
  id,
  name,
  isActive,
  createdAt,
  updatedAt,
  ...rest
}: StudentTableComponentProps): JSX.Element {
  const { request } = useFetch<StudentModel>();
  const { onDelete } = useStudent({ request });

  const handleEdit = (): void => {
    router.navigate(`/admin/students/${id}`);
  };

  const handleDelete = (): void => {
    if (Platform.OS === 'web') {
      const deleteConfirm = confirm(
        `Tem certeza que deseja remover?\nO aluno "${name}" será permanentemente removido.`,
      );

      if (deleteConfirm) {
        onDelete(id!);
        router.push('/admin');
      }
    } else {
      Alert.alert(
        'Tem certeza que deseja remover?',
        `O aluno "${name}" será permanentemente removido.`,
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
    </ResourceTableComponent>
  );
}
