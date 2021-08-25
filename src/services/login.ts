import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { url } from '../api/api';


export const loginApi = createApi({
	reducerPath: `login`,
	baseQuery: fetchBaseQuery({
	}),
	endpoints: (builder) => ({
		getLogin: builder.mutation({
			query:(input) => ({
				url: url + `/users/login`,
				method: 'POST',
				headers: { 
					email: input.email,
					password: input.password,
				}
			}),
		}),
	}),
});

export const { useGetLoginMutation } = loginApi;

