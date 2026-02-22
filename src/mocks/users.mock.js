let mockUsers = [
  // ================= SUPERADMIN (1) =================
  {
    id: 'SUP-001',
    userId: 'SUP-001',
    username: 'super.admin',
    userName: 'Super Admin',
    email: 'super.admin@example.com',
    phone: '+91 90000 00001',
    role: 'superadmin',
    vendor: 'Vendor1',
    status: 'active',
    aadharCardNumber: '123456789001',
    pancardNumber: 'ABCDE0001A',
    address: 'Head Office Address',
    createdAt: '2024-01-01T10:00:00Z',
    createdBy: 'system',
    updatedAt: '2024-01-01T10:00:00Z',
  },

  // ================= ADMINS (5) =================
  {
    id: 'ADM-001',
    userId: 'ADM-001',
    username: 'admin.one',
    userName: 'Admin One',
    email: 'admin1@example.com',
    phone: '+91 90000 00002',
    role: 'admin',
    vendor: 'Vendor1',
    status: 'active',
    aadharCardNumber: '123456789002',
    pancardNumber: 'ABCDE0002B',
    address: 'Admin Address 1',
    createdAt: '2024-01-02T10:00:00Z',
    createdBy: 'superadmin',
    updatedAt: '2024-01-02T10:00:00Z',
  },
  {
    id: 'ADM-002',
    userId: 'ADM-002',
    username: 'admin.two',
    userName: 'Admin Two',
    email: 'admin2@example.com',
    phone: '+91 90000 00003',
    role: 'admin',
    vendor: 'Vendor2',
    status: 'active',
    aadharCardNumber: '123456789003',
    pancardNumber: 'ABCDE0003C',
    address: 'Admin Address 2',
    createdAt: '2024-01-03T10:00:00Z',
    createdBy: 'superadmin',
    updatedAt: '2024-01-03T10:00:00Z',
  },
  {
    id: 'ADM-003',
    userId: 'ADM-003',
    username: 'admin.three',
    userName: 'Admin Three',
    email: 'admin3@example.com',
    phone: '+91 90000 00004',
    role: 'admin',
    vendor: 'Vendor3',
    status: 'active',
    aadharCardNumber: '123456789004',
    pancardNumber: 'ABCDE0004D',
    address: 'Admin Address 3',
    createdAt: '2024-01-04T10:00:00Z',
    createdBy: 'superadmin',
    updatedAt: '2024-01-04T10:00:00Z',
  },
  {
    id: 'ADM-004',
    userId: 'ADM-004',
    username: 'admin.four',
    userName: 'Admin Four',
    email: 'admin4@example.com',
    phone: '+91 90000 00005',
    role: 'admin',
    vendor: 'Vendor1',
    status: 'active',
    aadharCardNumber: '123456789005',
    pancardNumber: 'ABCDE0005E',
    address: 'Admin Address 4',
    createdAt: '2024-01-05T10:00:00Z',
    createdBy: 'superadmin',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: 'ADM-005',
    userId: 'ADM-005',
    username: 'admin.five',
    userName: 'Admin Five',
    email: 'admin5@example.com',
    phone: '+91 90000 00006',
    role: 'admin',
    vendor: 'Vendor2',
    status: 'active',
    aadharCardNumber: '123456789006',
    pancardNumber: 'ABCDE0006F',
    address: 'Admin Address 5',
    createdAt: '2024-01-06T10:00:00Z',
    createdBy: 'superadmin',
    updatedAt: '2024-01-06T10:00:00Z',
  },

  // ================= USERS (14) =================
  ...Array.from({ length: 14 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return {
      id: `USR-${num}`,
      userId: `USR-${num}`,
      username: `user.${num}`,
      userName: `User ${num}`,
      email: `user${num}@example.com`,
      phone: `+91 90000 00${num}`,
      role: 'user',
      vendor: `Vendor${(i % 3) + 1}`,
      status: 'active',
      aadharCardNumber: `1234567891${num}`,
      pancardNumber: `ABCDE10${num}`,
      address: `User Address ${num}`,
      createdAt: '2024-01-10T10:00:00Z',
      createdBy: 'admin',
      updatedAt: '2024-01-10T10:00:00Z',
    };
  }),
];

export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [...mockUsers],
        pagination: {
          total: mockUsers.length,
          page: 1,
          pageSize: 10,
          totalPages: Math.ceil(mockUsers.length / 10),
        },
      });
    }, 300);
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === id);
      if (user) {
        resolve({ data: user });
      } else {
        reject({ message: 'User not found', status: 404 });
      }
    }, 200);
  });
};

export const createUser = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        userId: `USR${String(mockUsers.length + 1).padStart(3, '0')}`,
        ...userData,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user',
        updatedAt: new Date().toISOString(),
        status: 'active',
      };
      mockUsers.push(newUser);
      resolve({ data: newUser, message: 'User created successfully' });

    }, 500);
  });
};

export const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex > -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...userData,
          updatedAt: new Date().toISOString(),
        };
        resolve({ data: mockUsers[userIndex], message: 'User updated successfully' });
      } else {
        reject({ message: 'User not found', status: 404 });
      }
    }, 400);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex > -1) {
        const deletedUser = mockUsers.splice(userIndex, 1);
        resolve({ data: deletedUser[0], message: 'User deleted successfully' });
      } else {
        reject({ message: 'User not found', status: 404 });
      }
    }, 400);
  });
};

export const resetPassword = (id, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === id);
      if (user) {
        user.updatedAt = new Date().toISOString();
        resolve({ data: user, message: 'Password reset successfully' });
      } else {
        reject({ message: 'User not found', status: 404 });
      }
    }, 300);
  });
};
