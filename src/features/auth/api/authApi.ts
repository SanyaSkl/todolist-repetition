import { instance } from "@/common/instance"
import { LoginInputs } from "@/features/auth/lib/schemas"
import { DefaultResponse } from "@/common/types"

export const authApi = {
  login(data: LoginInputs) {
    return instance.post<DefaultResponse>("/auth/login", data)
  },
  logout() {
    return instance.delete<DefaultResponse>("/auth/login")
  },
  me() {
    return instance.get<DefaultResponse>("/auth/me")
  },
}
