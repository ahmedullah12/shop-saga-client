import { createSlice, Middleware } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";

export type TUser = {
    email: string;
    role: string;
    iat: number;
    exp: number;
}

type TInitialState = {
    user: null | TUser;
    token: null | string;
}

const initialState: TInitialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

// middleware to clear cart on logout
export const authMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.type === 'auth/logOut') {
        store.dispatch(clearCart());
    }
    return next(action);
};

export const {setUser, logOut} = authSlice.actions;
export default authSlice.reducer;