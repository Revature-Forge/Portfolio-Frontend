import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store/Store';

export interface FullPortfolio {
    fullPortfolio: {}
}

const initialState: FullPortfolio = {
    fullPortfolio: {}
};

const fullPortfolioSlice = createSlice({
    name: "fullprotfolio",
    initialState,
    reducers: {
        setFullPortfolio(state, action: PayloadAction<any>) {
            state.fullPortfolio = action.payload;
        }
    }
})


export const getPortfolioSelector = (state: RootState) => state.fullPortfolio;
export const { setFullPortfolio } = fullPortfolioSlice.actions;

export default fullPortfolioSlice.reducer;