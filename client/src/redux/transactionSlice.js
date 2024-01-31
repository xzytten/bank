import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../utils/axios';

const initialState = {
    
    cash: null,
    status: null,
    newTransaction: null,

}

export const cardTransaction = createAsyncThunk(
    'transaction/card',
    async (params) => {
        const { data } = await axios.post('transaction/card', params);
        return data;
    }
)

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder

    //  Card Transaction
    .addCase(cardTransaction.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(cardTransaction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.cash = action.payload?.cash;
        state.newTransaction = action.payload?.newTransaction
    })
    .addCase(cardTransaction.rejected, (state) => {
        state.status = 'rejected';
    })
    }
})

export default transactionSlice.reducer;