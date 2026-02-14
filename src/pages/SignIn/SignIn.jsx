import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Checkbox from '../../components/UI/CheckBox/Checkbox';
import { useForm } from 'react-hook-form';
import { signInSchema } from '../../schemas/auth.schema';
import { testUsers } from '../../utils/constants/users';
import { useAuth } from '../../Context/AuthContext';


const SignIn = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
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


  const onSubmit = (data) => {
    const user = testUsers.find(
      (u) =>
        u.username === data.username &&
        u.password === data.password
    );

    if (!user) {
      alert("Invalid credentials ");
      return;
    }

    // Login user first
    login(user);

    //  If Two Factor Enabled
    if (user.isTwoFactor) {
      const generatedOtp = "123456";

      localStorage.setItem("otp", generatedOtp);
      localStorage.setItem("mfaEmail", user.email);
      localStorage.setItem("mfaUser", user.username);

      navigate("/mfa");
    } else {
      //  Direct access to dashboard
      navigate("/dashboard");
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
          />

          <Input
            type="password"
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <div className="flex gap-3 items-center">
            <Checkbox
              checked={rememberMe}
              label="Remember me"
              onChange={(checked) => setValue("rememberMe", checked)}
              {...register("rememberMe")}
            />
          </div>

        </div>

        <div className="flex flex-col gap-3">

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
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