import { showToast } from '../store/slices/toastSlice';
import { 
  createUser, 
  updateUser, 
  deleteUser, 
  resetPassword, 
  fetchUsers 
} from '../store/slices/userSlice';

/**
 * Helper function to dispatch user action with automatic toast notifications
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} thunkAction - The async thunk action (createUser, updateUser, etc.)
 * @param {Object} payload - The payload for the thunk
 * @param {Object} messages - Toast messages { success, error }
 */
export const dispatchUserActionWithToast = async (
  dispatch,
  thunkAction,
  payload,
  messages
) => {
  try {
    const result = await dispatch(thunkAction(payload)).unwrap();
    if (messages.success) {
      dispatch(showToast({ message: messages.success, type: 'success' }));
    }
    return result;
  } catch (error) {
    const errorMessage = messages.error || error?.message || 'Operation failed';
    dispatch(showToast({ message: errorMessage, type: 'error' }));
    throw error;
  }
};

/**
 * Predefined toast message templates
 */
export const toastMessages = {
  user: {
    create: {
      success: 'User created successfully',
      error: 'Failed to create user',
    },
    update: {
      success: 'User updated successfully',
      error: 'Failed to update user',
    },
    delete: {
      success: 'User deleted successfully',
      error: 'Failed to delete user',
    },
    resetPassword: {
      success: 'Password reset successfully',
      error: 'Failed to reset password',
    },
    fetch: {
      error: 'Failed to fetch users',
    },
  },
};
