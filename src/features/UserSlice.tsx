import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store/Store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = "http://localhost:8081/api";

export interface userState {
    user: {
        id: number,
        email: string,
        password: string,
        admin: boolean,
        lname: string,
        fname: string
    }
}

const initialState: userState = {
    user: {
        id: 0,
        email: "",
        "password": "",
        "admin": false,
        "lname": "",
        "fname": ""
    }
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<userState | any>) {
            state.user = action.payload;
        },
    }
})


export const userApiSlice = createApi({
    reducerPath: 'userApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getUsers: builder.query<userState[], void>({
            query: (name) => `/users`,
        }),
        getUserById: builder.query<userState, number>({
            query: (id: number) => `/users/${id}`,
        })
    }),
})





export const { useGetUsersQuery, useGetUserByIdQuery } = userApiSlice;
export default userSlice.reducer;
export const getUsersSelector = (state: RootState) => state.users;

export const { setUsers } = userSlice.actions;