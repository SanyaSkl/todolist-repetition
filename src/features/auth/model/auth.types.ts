import { loginSchema } from "@/features/auth/model/auth.schema.ts"
import z from "zod"

export type LoginInputs = z.infer<typeof loginSchema>
