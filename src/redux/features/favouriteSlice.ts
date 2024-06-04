import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteItem {
  [key: string]: boolean;
}

interface FavouriteState {
  favouriteItems: FavouriteItem;
}

const loadCartFromLocalStorage = (): FavouriteState => {
  try {
    const serializedState = localStorage.getItem('favorite');
    if (serializedState === null) {
      return { favouriteItems: {} };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load favortis from local storage", e);
    return { favouriteItems: {} };
  }
};

const saveCartToLocalStorage = (state: FavouriteState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('favorite', serializedState);
  } catch (e) {
    console.error("Could not save cart to local storage", e);
  }
};

const initialState: FavouriteState = loadCartFromLocalStorage();

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favouriteItems[id]) {
        delete state.favouriteItems[id];
      } else {
        state.favouriteItems[id] = true;
      }
      saveCartToLocalStorage(state);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favouriteItems[id] !== undefined) {
        delete state.favouriteItems[id];
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;