import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// Define root reducer with all feature slices
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other feature reducers here as they are created
});

export default rootReducer;
