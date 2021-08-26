import { createSlice } from "@reduxjs/toolkit"

export const portfolioSlice  = createSlice({
	name: "portfolio",
	initialState:  {
		portfolio: []
	}
	,
	reducers: {
		addPortfolio:(state, action) => {
			state.portfolio.concat(action.payload)
		}
	}
});

export const { addPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
	
