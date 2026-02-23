// api/authApi.js


import apiClient from "../../../services/apiClient";
import { http } from "../../../services/httpClient";
import * as authMock from "../../../mocks/auth.mock";


const apiBaseUrl="/auth";
const API_ENDPOINTS = {
  LOGIN: `${apiBaseUrl}/login`,
  REGISTER: `${apiBaseUrl}/register`,
  VERIFY_MFA: `${apiBaseUrl}/verify-mfa`,
  LOGOUT: `${apiBaseUrl}/logout`,
  FORGOT_PASSWORD: `${apiBaseUrl}/forgot-password`,
  RESET_PASSWORD: `${apiBaseUrl}/reset-password`,
};

const authService = {
  login: (username, password) =>
    http(
      () =>
        apiClient.post(API_ENDPOINTS.LOGIN, {
          username,
          password,
        }),
      () => authMock.login(username, password)
    ),

  register: (userData) =>
    http(
      () => apiClient.post(API_ENDPOINTS.REGISTER, userData),
      () => authMock.register(userData)
    ),

  verifyMfa: (otp) =>
    http(
      () => apiClient.post(API_ENDPOINTS.VERIFY_MFA, { otp }),
      () => authMock.verifyMfa(otp)
    ),

  logout: () =>
    http(
      () => apiClient.post(API_ENDPOINTS.LOGOUT),
      () => authMock.logout()
    ),

  requestPasswordReset: (identifier) =>
    http(
      () =>
        apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, {
          identifier,
        }),
      () => authMock.requestPasswordReset(identifier)
    ),

  resetPassword: (email, newPassword) =>
    http(
      () =>
        apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
          email,
          newPassword,
        }),
      () => authMock.resetPassword(email, newPassword)
    ),
};

export default authService;