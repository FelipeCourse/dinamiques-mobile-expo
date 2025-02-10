import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosRequestConfig } from 'axios';
import { useRouter } from 'expo-router';
import {
  Control,
  FieldErrors,
  UseFormReset,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { showMessage } from '@/utils';

import { CategoryModel } from '@/models';

import { useAuthContext } from '@/contexts';

import { UseFetchReturn } from '../use-fetch/use-fetch.hook';
import { categorySchema } from './category.schema';

type UseCategoryProps = Partial<UseFetchReturn<CategoryModel>> & {
  category?: CategoryModel;
  isUpdate?: boolean;
};

type UseCategoryReturn = {
  categoryForm: UseFormReturn<z.infer<typeof categorySchema>>;
  control: Control<z.infer<typeof categorySchema>>;
  errors: FieldErrors<z.infer<typeof categorySchema>>;
  handleSubmit: () => void;
  onDelete: (categoryId: string) => void;
  reset: UseFormReset<z.infer<typeof categorySchema>>;
};

export function useCategory({
  request,
  category,
  isUpdate = false,
}: UseCategoryProps): UseCategoryReturn {
  const router = useRouter();
  const { userData } = useAuthContext();
  const categoryForm = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: category?.id || '',
      name: category?.name || '',
      color: category?.color || '#000',
      isActive: category?.isActive ?? true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = categoryForm;

  const onSubmit = async (
    values: z.infer<typeof categorySchema>,
  ): Promise<void> => {
    delete values.id;

    if (!isUpdate) {
      delete values.isActive;
    }

    const categoryConfig: AxiosRequestConfig = {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: isUpdate ? `/categories/${category?.id}` : '/categories',
      data: values,
    };
    const response = await request!(categoryConfig);

    showMessage(response.message!);
    router.push('/admin/categories');
  };

  const onDelete = async (categoryId: string): Promise<void> => {
    const categoryConfig: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: `/categories/${categoryId}`,
    };
    const response = await request!(categoryConfig);

    showMessage(response.message!);
    router.push('/admin/categories');
  };

  return {
    categoryForm,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    onDelete,
    reset,
  };
}
