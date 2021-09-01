import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { userApiSlice } from '../features/UserSlice';
import IdReducer, { idApiSlice } from '../features/IdReducer'
import FullPortfolioReducer from '../features/FullPortfolioSlice';

export const store = configureStore({
    reducer: {
        users: UserReducer,
        id: IdReducer,
        fullPortfolio: FullPortfolioReducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [idApiSlice.reducerPath]: idApiSlice.reducer,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;