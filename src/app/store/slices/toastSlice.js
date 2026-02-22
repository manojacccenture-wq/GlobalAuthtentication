import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: 'success', // 'success', 'error', 'info', 'warning'
  duration: 3000,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {

      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
      state.duration = action.payload.duration || 3000;
    },
    clearToast: (state) => {
      state.message = null;
      state.type = 'success';
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;

// Selectors
export const selectToastMessage = (state) => state.toast.message;
export const selectToastType = (state) => state.toast.type;
export const selectToastDuration = (state) => state.toast.duration;
