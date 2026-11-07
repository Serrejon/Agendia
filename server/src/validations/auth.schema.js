import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string({ error: "El nombre es obligatorio" })
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(100, "El nombre no puede superar los 100 caracteres"),
    email: z
        .string({ error: "El email es obligatorio" })
        .trim()
        .toLowerCase()
        .pipe(z.email("El email no es válido")),
    password: z
        .string({ error: "La contraseña es obligatoria" })
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(72, "La contraseña no puede superar los 72 caracteres"),
});

export const loginSchema = z.object({
    email: z
        .string({ error: "El email es obligatorio" })
        .trim()
        .toLowerCase()
        .pipe(z.email("El email no es válido")),
    password: z
        .string({ error: "La contraseña es obligatoria" })
        .min(1, "La contraseña es obligatoria"),
});
