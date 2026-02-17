import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import { verifyMfaAsync,clearError } from "../authSlice";


const MFA = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { status, error, mfaPending, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  const isLoading = status === 'loading';
  const email = localStorage.getItem("mfaEmail");

  // Handle successful MFA verification
  useEffect(() => {
    if (!mfaPending && user && status === 'succeeded') {
      navigate("/dashboard");
    }
  }, [mfaPending, user, status, navigate]);

  const onSubmit = async (data) => {
    // Clear previous errors
    dispatch(clearError());
    
    // Dispatch verify MFA async thunk
    try {
      await dispatch(verifyMfaAsync(data.otp)).unwrap();
    } catch (err) {
      // Error is handled by Redux slice
      console.error('MFA verification failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
          Verify Code
        </h2>

        <p className="text-center text-xs sm:text-sm text-gray-500 mb-2">
          OTP sent to <span className="font-medium">{email}</span>
        </p>

        <p className="text-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
          Enter the 6-digit code sent to your email
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

          <Input
            type="text"
            placeholder="Enter 6 digit OTP"
            error={!!errors.otp}
            helperText={errors.otp?.message}
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits"
              }
            })}
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

        </form>

      </div>
    </div>
  );

};

export default MFA;
