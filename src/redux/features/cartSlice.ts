import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
}

interface CartState {
  cartItems: { cart: CartItem, quantity: number }[];
}

const loadCartFromLocalStorage = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { cartItems: [] };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load cart from local storage", e);
    return { cartItems: [] };
  }
};

const saveCartToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error("Could not save cart to local storage", e);
  }
};

const initialState: CartState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    restoreCart: (state, action: any) => {
      state.cartItems = action.payload;
    },
    addAllToCart: (state: any, action: PayloadAction<{ id: string, quantity: number, product: any }>) => {
      const { id, quantity, product } = action.payload;
      const existingItem = state.cartItems.find((item: any) => item.cart._id === id);
      if (!existingItem) {
        state.cartItems.push({ cart: product, quantity });
      } else {
        existingItem.quantity += quantity;
      }
      saveCartToLocalStorage(state);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(item => item.cart._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push({ cart: action.payload, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(item => item.cart._id === action.payload);
      if (!existingItem) {
        return;
      } else if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(item => item.cart._id !== action.payload);
      } else {
        existingItem.quantity -= 1;
      }
      saveCartToLocalStorage(state);
    },
    clearFromCart: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      const existingItem = state.cartItems.find(item => item.cart._id === action.payload);
      if (!existingItem) {
        return;
      } else {
        state.cartItems = state.cartItems.filter(item => item.cart._id !== action.payload);
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, restoreCart, clearFromCart, addAllToCart } = cartSlice.actions;

export default cartSlice.reducer;