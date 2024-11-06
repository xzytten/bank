import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./transactionSlice";

import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        transaction: transactionSlice,
    },
})

export default store;