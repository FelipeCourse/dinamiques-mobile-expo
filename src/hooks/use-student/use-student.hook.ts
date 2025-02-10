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

import { StudentModel } from '@/models';

import { useAuthContext } from '@/contexts';

import { UseFetchReturn } from '../use-fetch/use-fetch.hook';
import { createStudentSchema } from './create-student.schema';
import { updateStudentSchema } from './update-student.schema';

type UseStudentProps = Partial<UseFetchReturn<StudentModel>> & {
  student?: StudentModel;
  isUpdate?: boolean;
};

type UseStudentReturn = {
  studentForm: UseFormReturn<z.infer<typeof createStudentSchema>>;
  control: Control<z.infer<typeof createStudentSchema>>;
  errors: FieldErrors<z.infer<typeof createStudentSchema>>;
  handleSubmit: () => void;
  onDelete: (teacherId: string) => void;
  reset: UseFormReset<z.infer<typeof createStudentSchema>>;
};

export function useStudent({
  request,
  student,
  isUpdate = false,
}: UseStudentProps): UseStudentReturn {
  const { userData } = useAuthContext();
  const router = useRouter();
  const studentForm = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(isUpdate ? updateStudentSchema : createStudentSchema),
    defaultValues: {
      name: student?.name || '',
      username: student?.username || '',
      email: student?.email || '',
      password: student?.password || '',
      isActive: student?.isActive ?? true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = studentForm;

  const onSubmit = async (
    values: z.infer<typeof createStudentSchema>,
  ): Promise<void> => {
    if (!isUpdate) {
      delete values.isActive;
    }

    const studentConfig: AxiosRequestConfig = {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: isUpdate ? `/students/${student?.id}` : '/students',
      data: values,
    };
    const response = await request!(studentConfig);

    showMessage(response.message!);
    router.push('/admin/students');
  };

  const onDelete = async (studentId: string): Promise<void> => {
    const studentConfig: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: `/students/${studentId}`,
    };
    const response = await request!(studentConfig);

    showMessage(response.message!);
    router.push('/admin/students');
  };

  return {
    studentForm,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    onDelete,
    reset,
  };
}
