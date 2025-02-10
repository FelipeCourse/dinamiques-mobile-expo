import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { colors } from '@/styles';

import { AuthProvider } from '@/contexts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsLoadedError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontsLoadedError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsLoadedError]);

  if (!fontsLoaded && !fontsLoadedError) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.base[16](),
          },
        }}
      >
        <Stack.Screen
          name="sign-in"
          options={{ presentation: 'modal', animation: 'fade_from_bottom' }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ presentation: 'modal', animation: 'fade_from_bottom' }}
        />
      </Stack>
    </AuthProvider>
  );
}
