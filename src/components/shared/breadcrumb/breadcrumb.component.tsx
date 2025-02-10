import { Link } from 'expo-router';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';

import { s } from './breadcrumb.style';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

type BreadcrumbComponentProps = ViewProps & {
  breadcrumbItems: BreadcrumbItem[];
};

export function BreadcrumbComponent({
  breadcrumbItems,
  style,
}: BreadcrumbComponentProps): JSX.Element {
  return (
    <View style={[s.breadcrumbContainer, style]}>
      {breadcrumbItems.map((breadcrumbItem, index) => {
        const isLastBreadcrumbItem = index === breadcrumbItems.length - 1;

        return (
          <View key={index} style={s.breadcrumbItemContainer}>
            {isLastBreadcrumbItem ? (
              <Text style={[s.breadcrumbLabel, s.breadcrumbLastItem]}>
                {breadcrumbItem.label}
              </Text>
            ) : (
              <TouchableOpacity activeOpacity={0.8}>
                <Link
                  style={s.breadcrumbLabel}
                  href={{ pathname: breadcrumbItem.path as never }}
                >
                  {breadcrumbItem.label}
                </Link>
              </TouchableOpacity>
            )}
            {!isLastBreadcrumbItem && <View style={s.breadcrumbSeparator} />}
          </View>
        );
      })}
    </View>
  );
}
