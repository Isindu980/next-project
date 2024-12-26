import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favouritesReducer from './favouritesSlice';
import authReducer from './authSlice';
import productsReducer from './productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
