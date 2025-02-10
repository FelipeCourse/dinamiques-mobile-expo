import { z } from 'zod';

export const updateTeacherSchema = z.object({
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
