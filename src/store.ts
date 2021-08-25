import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { portfolioApi } from "./services/portfolios"
import { registerApi } from "./services/register"
import { loginApi } from "./services/login"

export const store = configureStore({
	reducer: {
		[portfolioApi.reducerPath]: portfolioApi.reducer,
		[registerApi.reducerPath]:  registerApi.reducer,
		[loginApi.reducerPath]:  loginApi.reducer,
	},
	middleware:(getDefaultMiddiware) => 
		getDefaultMiddiware().concat(portfolioApi.middleware, registerApi.middleware, loginApi.middleware),

	
});

setupListeners(store.dispatch);
