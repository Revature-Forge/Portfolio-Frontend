import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { portfolioUrl } from "../api/api";


export const portfolioApi = createApi({

		reducerPath: `user`,
		baseQuery: fetchBaseQuery({
			baseUrl: portfolioUrl
		}),
		endpoints: (builder) => ({
			getPortfolio: builder.query({
				query:(id) => `users/all/${id}`
			}),
		}),
	});

export const { useGetPortfolioQuery } = portfolioApi;
