import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export async function setItemStorage(
  key: string,
  object: object,
): Promise<void> {
  const serializedObject = JSON.stringify(object);

  if (Platform.OS === 'web') {
    sessionStorage.setItem(key, serializedObject);
  } else {
    await AsyncStorage.setItem(key, serializedObject);
  }
}

export async function removeItemsStorage(keys: string[]): Promise<void> {
  if (Platform.OS === 'web') {
    keys.forEach((key) => sessionStorage.removeItem(key));
  } else {
    AsyncStorage.multiRemove(keys);
  }
}

export async function getItemStorage(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return sessionStorage.getItem(key);
  } else {
    const object = await AsyncStorage.getItem(key);

    return object !== null ? JSON.parse(object) : null;
  }
}

export function hasItemStorage(key: string): boolean {
  return !!getItemStorage(key);
}
