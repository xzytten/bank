import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../utils/axios';

const initialState = {

    cash: null,
    message: null,
    transactionStatus: null,
    card: null,
    user: null,
    status: null,
    newTransaction: null,
    cashHistory: null,

}

export const cardTransaction = createAsyncThunk(
    'transaction/card',
    async (params) => {
        const { data } = await axios.post('transaction/card', params);
        return data;
    }
)

export const getUser = createAsyncThunk(
    'transaction/user',
    async (params) => {
        const { data } = await axios.post('transaction/user', params);
        return data
    }
)

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //  Card Transaction
            .addCase(cardTransaction.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(cardTransaction.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.cash = action.payload?.cash;
                state.newTransaction = action.payload?.newTransaction;
                state.message = action.payload?.message;
                state.transactionStatus = action.payload?.transactionStatus;
                state.cashHistory = action.payload?.cashHistory;

            })
            .addCase(cardTransaction.rejected, (state) => {
                state.status = 'rejected';
            })

            //Get User
            .addCase(getUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.card = action.payload?.card;
                state.user = action.payload?.user;
            })
            .addCase(getUser.rejected, (state) => {
                state.status = 'rejected';
            })
    }
})

export default transactionSlice.reducer;