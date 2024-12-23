import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favouritesReducer from './favouritesSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    auth: authReducer,
  },
});

export default store;
