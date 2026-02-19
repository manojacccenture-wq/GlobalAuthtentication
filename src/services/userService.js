import apiClient, { USE_MOCK_API } from './apiClient';
import * as usersMock from '../mocks/users.mock';

const API_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  RESET_PASSWORD: (id) => `/users/${id}/reset-password`,
};

const userService = {
  async getUsers(filters = {}) {
    if (USE_MOCK_API) {
      return usersMock.getUsers();
    }

    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id) {
    if (USE_MOCK_API) {
      return usersMock.getUserById(id);
    }

    try {
      const response = await apiClient.get(API_ENDPOINTS.USER_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData) {
    if (USE_MOCK_API) {
      return usersMock.createUser(userData);
    }

    try {
      const response = await apiClient.post(API_ENDPOINTS.USERS, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id, userData) {
    if (USE_MOCK_API) {
      return usersMock.updateUser(id, userData);
    }

    try {
      const response = await apiClient.put(API_ENDPOINTS.USER_BY_ID(id), userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id) {
    if (USE_MOCK_API) {
      return usersMock.deleteUser(id);
    }

    try {
      const response = await apiClient.delete(API_ENDPOINTS.USER_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async resetPassword(id, password) {
    if (USE_MOCK_API) {
      return usersMock.resetPassword(id, password);
    }

    try {
      const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD(id), {
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
