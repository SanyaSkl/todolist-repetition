import z from "zod"

export const loginSchema = z.object({
  email: z.email("Невалидный email"),
  password: z.string().min(3, "Минимальный пароль 3 символа"),
  rememberMe: z.boolean(),
})