import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { userSlice } from "./features/userSlice";
import { productSlice } from "./features/productSlice";
import { cartSlice } from "./features/cartSlice";
import { favoriteSlice } from "./features/favouriteSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        favorite: favoriteSlice.reducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export default store