import { Pressable, PressableProps, Text } from 'react-native';

import { s } from './category.style';

type CategoryComponentProps = PressableProps & {
  name: string;
  color: string;
  isSelected?: boolean;
};

export function CategoryComponent({
  name,
  color,
  isSelected = false,
  ...rest
}: CategoryComponentProps): JSX.Element {
  return (
    <Pressable
      style={[s.categoryContainer, isSelected && s.categoryContainerSelected]}
      {...rest}
    >
      <Text
        style={[
          s.categoryName,
          { borderBottomColor: color },
          isSelected && s.categoryNameSelected,
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}
