// mocks/auth.mock.js

let testUsers = [
  {
    id: 1,
    username: "SUP-001",
    email: "superadmin@company.com",
    password: "Super@123",
    role: "superadmin",
    isTwoFactor: true,
    isForgotPassword: true,
    profile: {
      fullName: "Super Admin",
      department: "Management",
      country: "India",
      phone: "9087397440",
      status: "active",
      createdAt: "2024-01-10",
    },
  },
  {
    id: 2,
    username: "ADM-001",
    email: "admin@company.com",
    password: "Admin@123",
    role: "admin",
    isTwoFactor: true,
    isForgotPassword: true,
    profile: {
      fullName: "System Admin",
      department: "IT",
      phone: "+91 9876500000",
      status: "active",
      createdAt: "2024-02-15",
    },
  },
  {
    id: 3,
    username: "USR-001",
    email: "user@company.com",
    password: "User@123",
    role: "user",
    isTwoFactor: false,
    isForgotPassword: false,
    profile: {
      fullName: "Regular User",
      department: "Sales",
      phone: "+91 9000000001",
      status: "active",
      createdAt: "2024-03-01",
    },
  },
];

export const login = (username, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = testUsers.find(
        (u) => u.username === username && u.password === password
      );



      if (user) {
        // Simulate token
        const token = `token_${user.id}_${Date.now()}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        resolve({
          user,
          token,
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });

export const register = (userData) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: testUsers.length + 1,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: 'user',
        isTwoFactor: false,
        isForgotPassword: false,
        profile: {
          fullName: userData.fullName || '',
          department: '',
          phone: '',
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
        },
      };

      const token = `token_${newUser.id}_${Date.now()}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(newUser));

      resolve({
        user: newUser,
        token,
      });
    }, 500);
  });

export const verifyMfa = (otp) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === localStorage.getItem('otp')) {
        resolve({ success: true });
      } else {
        reject(new Error('Invalid OTP'));
      }
    }, 500);
  });

export const requestPasswordReset = (identifier) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalized = identifier.trim().toLowerCase();

      const user = testUsers.find((u) => {
        return (
          u.email?.toLowerCase() === normalized ||
          u.username?.toLowerCase() === normalized ||
          u.profile?.phone?.replace(/\s/g, "") === normalized.replace(/\s/g, "")
        );
      });

      if (user) {
        localStorage.setItem("resetEmail", user.email);

        resolve({
          message: "Password reset email sent",
        });
      } else {
        reject(new Error("User not found"));
      }
    }, 500);
  });

export const resetPassword = (email, newPassword) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = testUsers.find((u) => u.email === email);
      if (user) {
        user.password = newPassword;
        localStorage.removeItem('resetEmail');
        resolve({ message: 'Password reset successfully' });
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('otp');
  localStorage.removeItem('mfaEmail');
  localStorage.removeItem('mfaUser');
}
  ;