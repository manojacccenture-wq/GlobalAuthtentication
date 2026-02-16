// Menu configuration for sidebar navigation
export const menuConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    roles: ['superadmin', 'admin', 'user', 'supervisor'],
    children: [],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'settings',
    roles: ['superadmin', 'admin'],
    children: [
      {
        id: 'user-settings',
        label: 'User Settings',
        path: '/settings/users',
        icon: 'users',
        roles: ['superadmin', 'admin'],
      },
      {
        id: 'account-settings',
        label: 'Account Settings',
        path: '/settings/account',
        icon: 'account',
        roles: ['superadmin', 'admin', 'user'],
      },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    path: '/billing',
    icon: 'billing',
    roles: ['superadmin', 'admin'],
    children: [],
  },
];

// Helper function to filter menu items based on user role
export const getMenuByRole = (role) => {
  return menuConfig.filter((item) => item.roles.includes(role));
};

// Helper function to check if user has access to a menu item
export const hasMenuAccess = (role, menuId) => {
  const findMenuItem = (items, id) => {
    for (let item of items) {
      if (item.id === id && item.roles.includes(role)) {
        return true;
      }
      if (item.children?.length > 0) {
        if (findMenuItem(item.children, id)) {
          return true;
        }
      }
    }
    return false;
  };

  return findMenuItem(menuConfig, menuId);
};
