import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { portfolioApi } from "./services/portfolios"
import { registerApi } from "./services/register"

export const store = configureStore({
	reducer: {
		[portfolioApi.reducerPath]: portfolioApi.reducer,
		[registerApi.reducerPath]:  registerApi.reducer,
	},
	middleware:(getDefaultMiddiware) => 
		getDefaultMiddiware().concat(portfolioApi.middleware, registerApi.middleware),

	
});

setupListeners(store.dispatch);
