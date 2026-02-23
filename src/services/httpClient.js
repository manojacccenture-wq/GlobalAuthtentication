import apiClient, { USE_MOCK_API } from "./apiClient";

export const http = async (realCall, mockCall) => {
  if (USE_MOCK_API && mockCall) {
    return mockCall();
  }
  return realCall();
};