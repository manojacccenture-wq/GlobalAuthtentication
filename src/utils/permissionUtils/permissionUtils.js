import { ROLE_PERMISSIONS } from '../../config/rolePermission/rolePermissions';

export const getPermissionsByRole = (role) => {

  return ROLE_PERMISSIONS[role] || [];
};

export const hasPermission = (role, permission) => {
  const permissions = getPermissionsByRole(role);

  return permissions.includes(permission);
};
