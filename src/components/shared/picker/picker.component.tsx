import {
  Picker,
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker';

import { colors } from '@/styles';

import { s } from './picker.style';

type PickerComponentProps = PickerProps & {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
};

function PickerComponent({
  selectedValue,
  setSelectedValue,
  children,
}: PickerComponentProps): JSX.Element {
  return (
    <Picker
      style={s.picker}
      dropdownIconColor={colors.base[8]()}
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    >
      {children}
    </Picker>
  );
}

type PickerItemComponentProps = PickerItemProps & {};

function PickerItemComponent({
  label,
  value,
  ...rest
}: PickerItemComponentProps): JSX.Element {
  return <Picker.Item label={label} value={value} {...rest} />;
}

PickerComponent.Item = PickerItemComponent;

export { PickerComponent };
