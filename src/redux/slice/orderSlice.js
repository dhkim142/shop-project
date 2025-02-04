import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    OrderHistory: [],
    totalOrderAmount: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        STORE_ORDERS(state, action) {
            state.OrderHistory = action.payload;
        }
    }
})

export const { STORE_ORDERS } = orderSlice.actions;
export const selectOrderHistory = (state) => state.orders.OrderHistory;
export default orderSlice.reducer;