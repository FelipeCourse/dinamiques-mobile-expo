import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosRequestConfig } from 'axios';
import { useRouter } from 'expo-router';
import { Control, FieldErrors, UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { showMessage, verifyToken } from '@/utils';

import { ROLES } from '@/constants';

import { UserModel, UserStorageModel } from '@/models';

import { useAuthContext } from '@/contexts';

import { UseFetchReturn } from '../use-fetch/use-fetch.hook';
import { signInSchema } from './sign-in.schema';

type SignInDataModel = {
  id: string;
  accessToken: string;
};

type UseSignInProps = Partial<UseFetchReturn<UserModel>>;

type UseSignInReturn = {
  signInForm: UseFormReturn<z.infer<typeof signInSchema>>;
  control: Control<z.infer<typeof signInSchema>>;
  errors: FieldErrors<z.infer<typeof signInSchema>>;
  handleSubmit: () => void;
};

export function useSignIn({ request }: UseSignInProps): UseSignInReturn {
  const router = useRouter();
  const { handleAuthenticate } = useAuthContext();
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = signInForm;

  const onSubmit = async (
    values: z.infer<typeof signInSchema>,
  ): Promise<void> => {
    const signInConfig: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: '/users/signin',
      data: values,
    };
    const response = await request!(signInConfig);

    if (response.statusCode === 200) {
      const signInDataResponse = response.data as unknown as SignInDataModel;
      const accessToken = signInDataResponse.accessToken;
      const decodedAccessToken = verifyToken(accessToken) as UserStorageModel;

      decodedAccessToken.accessToken = accessToken;
      handleAuthenticate(true, decodedAccessToken);

      if (decodedAccessToken.roleName === ROLES.teacher) {
        router.replace('/(drawer)/admin');
      } else {
        router.replace('/(drawer)/blog');
      }
    }

    showMessage(response.message!);
  };

  return {
    signInForm,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
}
