import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {                                             // 상태를 업데이트
        SET_ACTIVE_USER: (state, action) => {
            const { email, userName, userID } = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userID = userID;
        },
        REMOVE_ACTIVE_USER: (state) => {                    // 로그아웃을 위한 것이므로 payload할 필요없이 초기상태로 만들면 됨
            state.isLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userID = null;
        }
    }
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;