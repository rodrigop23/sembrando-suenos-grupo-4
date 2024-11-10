import { z } from "zod";

export const registerUserSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      .max(20, {
        message: "El nombre de usuario debe tener como máximo 20 caracteres",
      }),
    email: z.string().email({
      message: "Ingresa un correo electrónico válido",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 6 caracteres",
      })
      .max(16, {
        message: "La contraseña debe tener como máximo 16 caracteres",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "La contraseña debe contener al menos un número",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "La contraseña debe contener al menos un carácter especial",
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

export const loginUserSchema = z.object({
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(16, {
      message: "La contraseña debe tener como máximo 16 caracteres",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .refine((value) => /\d/.test(value), {
      message: "La contraseña debe contener al menos un número",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
});

export type LoginUserType = z.infer<typeof loginUserSchema>;
export type RegisterUserType = z.infer<typeof registerUserSchema>;
