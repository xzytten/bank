import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

const initialState = {
    user: null,
    card: null,
    transactionHistory: null,
    totalCountTransaction: null,
    statusHistory: null,
    token: null,
    isLoading: null,
    status: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (params) => {
        try {
            const { data } = await axios.post('auth/login', params);

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            return error
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (params) => {
        try {
            const { data } = await axios.post('auth/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            return error
        }
    }
)


export const getMe = createAsyncThunk(
    'auth/getme',
    async () => {
        try {
            const { data } = await axios.get('auth/getme');

            return data;
        } catch (error) {
            return error
        }
    }
)

export const getMoreTransaction = createAsyncThunk(
    'auth/getmore',
    async ({ userId, totalCount }) => {
        try {
            const { data } = await axios.post('auth/getmore', { userId, totalCount });
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.card = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = false;
                state.status = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = true;
                state.user = action.payload.newUser;
                state.token = action.payload.token;
                state.status = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
            })

            // login 
            .addCase(login.pending, (state) => {
                state.isLoading = false;
                state.status = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
            })

            //  getMe
            .addCase(getMe.pending, (state) => {
                state.isLoading = false;
                state.status = 'pending';
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = true;
                state.user = action.payload?.user;
                state.card = action.payload?.card;
                state.transactionHistory = action.payload?.transactions;
                state.token = action.payload?.token;
                state.totalCountTransaction = action.payload?.totalCountTransaction;
                state.status = 'fulfilled';

            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'rejected';
            })

            // get more
            .addCase(getMoreTransaction.pending, (state) => {
                state.isLoading = false;
                state.statusHistory = 'pending';
            })
            .addCase(getMoreTransaction.fulfilled, (state, action) => {
                state.transactionHistory = (state.transactionHistory || []).concat(action.payload?.transactions || []);
                state.statusHistory = 'fulfilled';
            })
            .addCase(getMoreTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.statusHistory = 'rejected';
            })
    }
})

export const { action, reducer } = authSlice;


export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectCard = (state) => state.auth.card;
export default authSlice.reducer;
