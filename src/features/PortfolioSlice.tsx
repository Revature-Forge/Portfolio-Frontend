import Portfolio from '../interfaces/Portfolio';
import User from '../interfaces/User';
import { useSelector } from "react-redux";
// import { useAppSelector } from '../store/Hooks';
import { userState, } from '../features/UserSlice';
// import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


const User1 = {
    id: 0,
    name: "string",
    password: "string",
    admin: false
};

const initialState: Portfolio = {
    id: 0,
    name: "string",
    user: User1,
    submitted: false,
    approved: false,
    reviewed: false,
    feedback: "string",
    admin: User1
}

const URL = "http://localhost:8081/api";

// const portfolioSlice = createSlice({
// name:"portfolio",
// initialState,
// reducers:{
//     setPortfolio(state,action)
// }
// })

export const portfolioApiSlice = createApi({
    reducerPath: 'portfolioApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getPortfolio: builder.query<Portfolio, number>({
            query: (id: number) => `/portfolios/${id}`
        })
    })
})

export const { useGetPortfolioQuery } = portfolioApiSlice;
export default portfolioApiSlice.reducer;
