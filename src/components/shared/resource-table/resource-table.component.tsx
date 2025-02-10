import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { PencilIcon, TrashIcon } from 'react-native-heroicons/outline';

import { colors } from '@/styles';

import { formatDateAuditFields } from '@/libs';

import { ResourceTableModel } from '@/models';

import { s } from './resource-table.style';

type ResourceTableComponentProps = ViewProps &
  ResourceTableModel & {
    handleDelete: () => void;
    handleEdit: () => void;
  };

export function ResourceTableComponent({
  id,
  isActive,
  createdAt,
  updatedAt,
  createdBy,
  updatedBy,
  handleDelete,
  handleEdit,
  children,
  ...rest
}: ResourceTableComponentProps): JSX.Element {
  return (
    <View style={[s.resourceTableContainer]} {...rest}>
      <View style={s.resourceTableActionsContainer}>
        <TouchableOpacity
          style={s.resourceTableActions}
          activeOpacity={0.8}
          onPress={handleEdit}
        >
          <PencilIcon color={colors.primary[5]()} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          style={s.resourceTableActions}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <TrashIcon color={colors.error[5]()} size={16} />
        </TouchableOpacity>
      </View>
      {id && (
        <View style={s.resourceTableFieldContainer}>
          <Text
            style={[s.resourceTableFieldCommon, s.resourceTableFieldColumn]}
          >
            ID
          </Text>
          <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldValue]}>
            {id}
          </Text>
        </View>
      )}
      {children}
      {isActive !== undefined && (
        <View style={s.resourceTableFieldContainer}>
          <Text
            style={[s.resourceTableFieldCommon, s.resourceTableFieldColumn]}
          >
            Ativo
          </Text>
          <Text
            style={[
              s.resourceTableFieldCommon,
              s.resourceTableFieldValue,
              s.resourceTableFieldIsActiveFalse,
              isActive && s.resourceTableFieldIsActiveTrue,
            ]}
          >
            {isActive === true ? 'sim' : 'não'}
          </Text>
        </View>
      )}
      <View style={s.resourceTableFieldContainer}>
        <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldColumn]}>
          Criado em
        </Text>
        <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldValue]}>
          {formatDateAuditFields(createdAt)}
        </Text>
      </View>
      <View style={s.resourceTableFieldContainer}>
        <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldColumn]}>
          Atualizado em
        </Text>
        <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldValue]}>
          {formatDateAuditFields(updatedAt)}
        </Text>
      </View>
      {createdBy && (
        <View style={s.resourceTableFieldContainer}>
          <Text
            style={[s.resourceTableFieldCommon, s.resourceTableFieldColumn]}
          >
            Criado por
          </Text>
          <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldValue]}>
            {createdBy}
          </Text>
        </View>
      )}
      {updatedBy && (
        <View style={s.resourceTableFieldContainer}>
          <Text
            style={[s.resourceTableFieldCommon, s.resourceTableFieldColumn]}
          >
            Atualizado por
          </Text>
          <Text style={[s.resourceTableFieldCommon, s.resourceTableFieldValue]}>
            {updatedBy}
          </Text>
        </View>
      )}
    </View>
  );
}
