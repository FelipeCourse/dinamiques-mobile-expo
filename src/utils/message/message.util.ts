import { Alert, Platform } from 'react-native';

export function showMessage(message: string): void {
  if (Platform.OS === 'web') {
    window.alert(message);
  } else {
    Alert.alert(`${message}`);
  }
}
