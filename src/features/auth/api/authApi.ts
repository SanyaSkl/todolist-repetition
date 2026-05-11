import { LoginInputs } from "@/features/auth/lib/schemas"
import { DefaultResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<DefaultResponse, LoginInputs>({
      query: (body) => {
        return { method: "post", url: "auth/login", body }
      },
    }),
    logout: builder.mutation<DefaultResponse, void>({
      query: () => {
        return { method: "delete", url: "auth/login" }
      },
    }),
    me: builder.query<DefaultResponse, void>({
      query: () => {
        return { method: "get", url: "auth/me" }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
