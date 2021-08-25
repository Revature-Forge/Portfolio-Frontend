import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { url } from "../api/api";

export const registerApi = createApi({
	reducerPath: `register`,
	baseQuery: fetchBaseQuery({
	}),
	endpoints: (builder) => ({
		getRegister: builder.mutation({
			query:(input) => ({
				url: url + `/users`,
				method: 'POST',
				body: input,

			}),
		}),
	}),
});

export const { useGetRegisterMutation } = registerApi;
