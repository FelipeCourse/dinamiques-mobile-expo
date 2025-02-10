import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import { Control, FieldErrors, UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { showMessage } from '@/utils';

import { UserModel } from '@/models';

import { UseFetchReturn } from '../use-fetch/use-fetch.hook';
import { signUpSchema } from './sign-up.schema';

type UseSignUpProps = Partial<UseFetchReturn<UserModel>>;

type UseSignUpReturn = {
  signUpForm: UseFormReturn<z.infer<typeof signUpSchema>>;
  control: Control<z.infer<typeof signUpSchema>>;
  errors: FieldErrors<z.infer<typeof signUpSchema>>;
  handleSubmit: () => void;
};

export function useSignUp({ request }: UseSignUpProps): UseSignUpReturn {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = signUpForm;

  const onSubmit = async (
    values: z.infer<typeof signUpSchema>,
  ): Promise<void> => {
    const signInConfig: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: '/students',
      data: values,
    };
    const response = await request!(signInConfig);

    if (response.statusCode === 201) {
      router.replace('/sign-in');
    }

    showMessage(response.message!);
  };

  return {
    signUpForm,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
}
