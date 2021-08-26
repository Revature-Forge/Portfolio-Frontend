import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/Store';


export interface userId {
    user: {
        id: number,
        email: string,
        password: string,
        admin: boolean,
        lname: string,
        fname: string
    }
}

const initialState: userId = {
    user: {
        id: 0,
        email: "",
        "password": "",
        "admin": false,
        "lname": "",
        "fname": ""
    }
}


const idSlice = createSlice({
    name: 'userId',
    initialState: initialState,
    reducers: {
        setId(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
    },
})

const URL = "http://localhost:8081/api";

export const idApiSlice = createApi({
    reducerPath: 'userApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getUsers: builder.query<userId[], void>({
            query: (name) => `/users`,
        }),
        getUserById: builder.query<userId, number>({
            query: (id: number) => `/users/${id}`,
        })
    }),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = idApiSlice;
export default idSlice.reducer;
export const getUsersSelector = (state: RootState) => state.id;

export const { setId } = idSlice.actions;