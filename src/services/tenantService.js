export const getTenantId = () => {
  // Example: stored after login
  return localStorage.getItem("tenant_id");
};