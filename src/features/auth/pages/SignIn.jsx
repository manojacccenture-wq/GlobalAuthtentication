import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../../shared/components/UI/Input/Input';
import Button from '../../../shared/components/UI/Button/Button';
import Checkbox from '../../../shared/components/UI/CheckBox/Checkbox';
import { useForm } from 'react-hook-form';
import { signInSchema } from '../schemas/auth.schema';
import { loginAsync,clearError } from '../authThunk';



const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { status, error, user, mfaPending } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");
  const isLoading = status === 'loading';

  // Handle successful login
  useEffect(() => {
    if (user && !mfaPending) {
      navigate("/dashboard");
    } else if (user && mfaPending) {
      const generatedOtp = "123456";
      localStorage.setItem("otp", generatedOtp);
      localStorage.setItem("mfaEmail", user.email);
      localStorage.setItem("mfaUser", user.username);
      navigate("/mfa");
    }
  }, [user, mfaPending, navigate]);

  const onSubmit = async (data) => {
    // Clear previous errors
    dispatch(clearError());
    
    // Dispatch login async thunk
    try {
      await dispatch(loginAsync({
        username: data.username,
        password: data.password,
      })).unwrap();
    } catch (err) {
      // Error is handled by Redux slice
      console.error('Login failed:', err);
    }
  };

  const handleNavigateForgotPassword = () => {
    navigate("/forgotPassword");
  }

return (
  <div className="min-h-screen bg-white grid place-items-center px-4 sm:px-6 lg:px-8">

    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xs flex flex-col">

      <div className="flex items-center justify-center gap-1.5 mb-6 sm:mb-8">
        <svg
          className="w-[46px] h-[46px]"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="46" height="46" fill="#dbc5c517" rx="8" alt="App Logo" />
        </svg>
        <p className="font-extrabold text-base text-text-primary">
          Your App Name
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-5 mb-6">

          <Input
            type="text"
            placeholder="ADM-001"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
            onChange={(e) =>
              setValue("username", e.target.value.toUpperCase())
            }
            disabled={isLoading}
          />

          <Input
            type="password"
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            disabled={isLoading}
          />

          <div className="flex gap-3 items-center">
            <Checkbox
              checked={rememberMe}
              label="Remember me"
              onChange={(checked) => setValue("rememberMe", checked)}
              {...register("rememberMe")}
              disabled={isLoading}
            />
          </div>

        </div>

        <div className="flex flex-col gap-3">

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="font-normal text-[#3a3f51] text-center text-sm sm:text-base">
            <a
              href="#"
              className="text-text-primary hover:underline"
              onClick={handleNavigateForgotPassword}
            >
              Forgot password?
            </a>
          </p>

        </div>
      </form>

    </div>
  </div>
);

};

export default SignIn;