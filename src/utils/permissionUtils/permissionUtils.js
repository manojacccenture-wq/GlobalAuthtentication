import { PERMISSIONS } from '../../config/permission/permission';
import { ROLE_PERMISSIONS } from '../../config/rolePermission/rolePermissions';

export const getPermissionsByRole = (role) => {

  return ROLE_PERMISSIONS[role] || [];
};

export const hasPermission = (role, permission) => {
  console.log('permission: ', permission)
  // Always allow PUBLIC routes
  if (permission === PERMISSIONS.PUBLIC) return true;
  const permissions = getPermissionsByRole(role);

  return permissions.includes(permission);
};
