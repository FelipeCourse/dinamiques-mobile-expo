import { useRouter } from 'expo-router';
import { createContext, useContext, useMemo, useState } from 'react';

import { removeItemsStorage, setItemStorage } from '@/utils';

import { UserStorageModel } from '@/models';

type AuthContextData = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserStorageModel | null;
  setUserData: React.Dispatch<React.SetStateAction<UserStorageModel | null>>;
};

type AuthContextReturn = {
  isAuthenticated: boolean;
  userData: UserStorageModel | null;
  handleAuthenticate: (
    authenticated: boolean,
    userData?: UserStorageModel,
  ) => void;
  handleUserStorage: (userData: UserStorageModel) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserStorageModel | null>({
    id: '',
    accessToken: '',
    roleName: '',
    exp: 0,
    email: '',
    username: '',
  });

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      userData,
      setUserData,
    }),
    [isAuthenticated, userData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextReturn {
  const router = useRouter();

  if (useContext(AuthContext) === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  const { isAuthenticated, setIsAuthenticated, userData, setUserData } =
    useContext(AuthContext);

  const handleUserStorage = async (user: UserStorageModel): Promise<void> => {
    await setItemStorage(process.env.EXPO_PUBLIC_STORAGE_KEY!, user);
  };

  const handleAuthenticate = async (
    authenticated: boolean,
    user?: UserStorageModel,
  ): Promise<void> => {
    setIsAuthenticated(authenticated);

    if (authenticated && user) {
      setUserData(user);
      await handleUserStorage(user);
    } else {
      setUserData(null);
      await removeItemsStorage([process.env.EXPO_PUBLIC_STORAGE_KEY!]);
      router.push('/');
    }
  };

  return { isAuthenticated, handleAuthenticate, userData, handleUserStorage };
}
