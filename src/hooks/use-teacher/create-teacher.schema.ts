import { z } from 'zod';

import { USERNAME_PATTERN } from '@/patterns';

export const createTeacherSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Nome é obrigatório.',
    })
    .min(5, {
      message: 'Nome deve ter pelo menos 5 caracteres.',
    })
    .max(255, {
      message: 'Nome deve ter no máximo 255 caracteres.',
    }),

  username: z
    .string()
    .min(1, {
      message: 'Nome de usuário é obrigatório.',
    })
    .min(5, {
      message: 'Nome de usuário deve ter pelo menos 5 caracteres.',
    })
    .max(30, {
      message: 'Nome de usuário deve ter no máximo 30 caracteres.',
    })
    .refine(
      (value) => {
        if (!value) return true;

        return USERNAME_PATTERN.test(value);
      },
      {
        message: 'Nome de usuário não pode conter espaços.',
      },
    ),

  email: z
    .string()
    .min(1, {
      message: 'E-mail é obrigatório.',
    })
    .min(8, {
      message: 'E-mail deve ter pelo menos 8 caracteres.',
    })
    .max(128, {
      message: 'E-mail deve ter no máximo 255 caracteres.',
    })
    .email('E-mail deve ser válido.'),

  password: z
    .string()
    .min(1, {
      message: 'Senha é obrigatória.',
    })
    .min(5, {
      message: 'Senha deve ter pelo menos 5 caracteres.',
    })
    .max(128, {
      message: 'Senha deve ter no máximo 128 caracteres.',
    }),

  isActive: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .optional()
    .refine(
      (value) => {
        if (typeof value === 'string') {
          return value === 'true' || value === 'false';
        }

        return true;
      },
      {
        message: 'ativo deve ser uma string "true" ou "false", ou um booleano.',
      },
    )
    .transform((value) => {
      if (typeof value === 'string') {
        return value === 'true';
      }

      return value;
    }),
});
