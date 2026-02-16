import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import { requestPasswordResetAsync, clearError } from "../authSlice";

//  Username validation (ADM-001 format)
const forgotPasswordSchema = z.object({
  username: z
    .string()
    .regex(
      /^[A-Z]{3}-\d{3}$/,
      "Username must be in format: ADM-001"
    ),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { status, error, resetPasswordEmail } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
    },
  });

  const isLoading = status === 'loading';

  // If password reset was successful, navigate to reset password page
  useEffect(() => {
    if (resetPasswordEmail && status === 'succeeded') {
      navigate("/reset-password", {
        state: { username: resetPasswordEmail },
      });
    }
  }, [resetPasswordEmail, status, navigate]);

  const onSubmit = async (data) => {
    // Clear previous errors
    dispatch(clearError());
    
    // TODO: In a real app, you'd fetch the user's email from the backend using the username
    // For now, we'll use a simple mapping
    const testUsers = {
      'SUP-001': 'superadmin@company.com',
      'ADM-001': 'admin@company.com',
      'USR-001': 'user@company.com',
    };

    const email = testUsers[data.username.toUpperCase()];
    
    if (!email) {
      // Dispatch will handle the error
      dispatch(requestPasswordResetAsync('invalid')).catch(() => {});
      return;
    }

    try {
      await dispatch(requestPasswordResetAsync(email)).unwrap();
    } catch (err) {
      // Error is handled by Redux slice
      console.error('Password reset request failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md  rounded-2xl  p-6 sm:p-8 md:p-10">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your username to reset your password
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Input
            type="text"
            placeholder="Enter username"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
            onChange={(e) =>
              setValue("username", e.target.value.toUpperCase())
            }
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;
