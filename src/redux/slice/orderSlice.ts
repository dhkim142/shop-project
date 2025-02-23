import { IOrder } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IOrderState {
    OrderHistory: IOrder[];
    totalOrderAmount: null | number;
}

const initialState: IOrderState = {
    OrderHistory: [],
    totalOrderAmount: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        STORE_ORDERS(state, action) {
            state.OrderHistory = action.payload;
        },
        CALCULATE_TOTAL_ORDER_AMOUNT(state) {
            const array: number[] = []
            state.OrderHistory.map((item) => {
                const {orderAmount} = item
                return array.push(orderAmount)
            })
            const totalAmount = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.totalOrderAmount = totalAmount
        }
    }
})

export const { STORE_ORDERS, CALCULATE_TOTAL_ORDER_AMOUNT } = orderSlice.actions;
export const selectOrderHistory = (state: RootState) => state.orders.OrderHistory;
export const selectTotalOrderAmount = (state: RootState) => state.orders.totalOrderAmount;
export default orderSlice.reducer;