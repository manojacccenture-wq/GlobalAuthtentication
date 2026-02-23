import {  createAsyncThunk } from '@reduxjs/toolkit';
import authService  from './api/authApi';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(username, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyMfaAsync = createAsyncThunk(
  'auth/verifyMfa',
  async (otp, { rejectWithValue }) => {
    try {
      await authService.verifyMfa(otp);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestPasswordResetAsync = createAsyncThunk(
  'auth/requestPasswordReset',
  async (identifier, { rejectWithValue }) => {
    try {
      const response = await authService.requestPasswordReset(identifier);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(email, newPassword);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
