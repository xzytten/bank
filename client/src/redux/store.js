import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import transactionSlice from "./transactionSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        transaction: transactionSlice,
    },
})

export default store;