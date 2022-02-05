import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {httpClient} from "../httpClient/httpClient";
import { RootState } from '../redux/store';
import {AxiosRequestConfig} from "axios";

interface UserState{
    id: number | undefined,
    name: string | undefined,
}

const initialState: UserState = {
    id: undefined,
    name: undefined,
};

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async(userId: number , { rejectWithValue }) => {
        try {
            const config: AxiosRequestConfig = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const result = await httpClient.get('https://jsonplaceholder.typicode.com/users/' + userId, config );

            return result.data;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        } finally {
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
        },
    },
});

export default userSlice.reducer;