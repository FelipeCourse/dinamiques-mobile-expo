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

import { ArticleModel } from '@/models';

import { useAuthContext } from '@/contexts';

import { UseFetchReturn } from '../use-fetch/use-fetch.hook';
import { articleSchema } from './article.schema';

type UseArticleProps = Partial<UseFetchReturn<ArticleModel>> & {
  article?: ArticleModel;
  isUpdate?: boolean;
};

type UseArticleReturn = {
  articleForm: UseFormReturn<z.infer<typeof articleSchema>>;
  control: Control<z.infer<typeof articleSchema>>;
  errors: FieldErrors<z.infer<typeof articleSchema>>;
  handleSubmit: () => void;
  onDelete: (articleId: string) => void;
  reset: UseFormReset<z.infer<typeof articleSchema>>;
};

export function useArticle({
  request,
  article,
  isUpdate = false,
}: UseArticleProps): UseArticleReturn {
  const router = useRouter();
  const { userData } = useAuthContext();
  const articleForm = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      id: article?.id || '',
      categoryId: article?.category?.id || '',
      title: article?.article?.title || '',
      summary: article?.article?.summary || '',
      readingTime: article?.article?.readingTime || 0,
      content: article?.article?.content || '',
      highlightImageUrl: article?.article?.highlightImageUrl || '',
      isPublished: article?.article?.isPublished ?? true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = articleForm;

  const onSubmit = async (
    values: z.infer<typeof articleSchema>,
  ): Promise<void> => {
    delete values.id;

    if (!isUpdate) {
      delete values.isPublished;
    }

    const articleConfig: AxiosRequestConfig = {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: isUpdate ? `/articles/${article?.id}` : '/articles',
      data: values,
    };
    const response = await request!(articleConfig);

    showMessage(response.message!);
    router.push('/admin/articles');
  };

  const onDelete = async (articleId: string): Promise<void> => {
    const articleConfig: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: `/articles/${articleId}`,
    };
    const response = await request!(articleConfig);

    showMessage(response.message!);
    router.push('/admin/articles');
  };

  return {
    articleForm,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    onDelete,
    reset,
  };
}
