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

import { TeacherModel } from '@/models';

import { useAuthContext } from '@/contexts';

import { UseFetchReturn } from '../use-fetch/use-fetch.hook';
import { createTeacherSchema } from './create-teacher.schema';
import { updateTeacherSchema } from './update-teacher.schema';

type UseTeacherProps = Partial<UseFetchReturn<TeacherModel>> & {
  teacher?: TeacherModel;
  isUpdate?: boolean;
};

type UseTeacherReturn = {
  teacherForm: UseFormReturn<z.infer<typeof createTeacherSchema>>;
  control: Control<z.infer<typeof createTeacherSchema>>;
  errors: FieldErrors<z.infer<typeof createTeacherSchema>>;
  handleSubmit: () => void;
  onDelete: (teacherId: string) => void;
  reset: UseFormReset<z.infer<typeof createTeacherSchema>>;
};

export function useTeacher({
  request,
  teacher,
  isUpdate = false,
}: UseTeacherProps): UseTeacherReturn {
  const router = useRouter();
  const { userData } = useAuthContext();
  const teacherForm = useForm<z.infer<typeof createTeacherSchema>>({
    resolver: zodResolver(isUpdate ? updateTeacherSchema : createTeacherSchema),
    defaultValues: {
      name: teacher?.name || '',
      username: teacher?.username || '',
      email: teacher?.email || '',
      password: teacher?.password || '',
      isActive: teacher?.isActive ?? true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = teacherForm;

  const onSubmit = async (
    values: z.infer<typeof createTeacherSchema>,
  ): Promise<void> => {
    if (!isUpdate) {
      delete values.isActive;
    }

    const teacherConfig: AxiosRequestConfig = {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: isUpdate ? `/teachers/${teacher?.id}` : '/teachers',
      data: values,
    };
    const response = await request!(teacherConfig);

    showMessage(response.message!);
    router.replace('/admin/teachers');
  };

  const onDelete = async (teacherId: string): Promise<void> => {
    const teacherConfig: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: `/teachers/${teacherId}`,
    };
    const response = await request!(teacherConfig);

    showMessage(response.message!);
    router.push('/admin/teachers');
  };

  return {
    teacherForm,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    onDelete,
    reset,
  };
}
