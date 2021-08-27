import { createSlice } from "@reduxjs/toolkit"

export const portfolioSlice  = createSlice({
	name: "portfolio",
	initialState:  {
		id: 0,
		name: "",
		user: {

		},
		submitted: false,
		approved: false,
		reviewed: false,
		feedback: "",
		flags: { },
		aboutme: {
		},
		Certification: [],
		Education: [],
		equivalencies: [],
		github: [],
		honors: [],
		workExperiences: [],
		workHistories: [],
		matrices: []
	}
	,
	reducers: {
		setPortfolio:(state, action) => {
			state= action.payload;
		}
			
	}
});

export const { setPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
	
