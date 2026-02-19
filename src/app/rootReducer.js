import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from './store/slices/userSlice';
import toastReducer from './store/slices/toastSlice';

// Define root reducer with all feature slices
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  toast: toastReducer,
});

export default rootReducer;
