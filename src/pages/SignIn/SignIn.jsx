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
    localStorage.setItem("mfaUser", user.username);

    navigate("/mfa");
  } else {
    //  Direct access to dashboard
    navigate("/dashboard");
  }
};


  const handleNavigateForgotPassword=()=>{
    navigate("/forgotPassword");
  }


  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

      <div className="w-full 
                max-w-sm 
                sm:max-w-md 
                md:max-w-lg 
                lg:max-w-md 
                mx-auto">

        <div className="flex items-center justify-center gap-[5.208px] mb-[82px]">
          <svg
            className="w-[46px] h-[46px]"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="46" height="46" fill="#dbc5c517" rx="8" alt="App Logo" />
          </svg>
          <p className=" font-extrabold text-[19.203px] leading-[25.604px] text-[#00bfa6] tracking-[-0.2304px]">
            Your App Name
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-[20px] mb-[20px]">
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
            <div className="flex gap-[12px] items-center">
              <Checkbox
                checked={rememberMe}
                label="Remember me"
                onChange={(checked) => setValue("rememberMe", checked)}
                {...register("rememberMe")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <p className=" font-normal  text-[#3a3f51] text-center ">
              <a href="#" className="text-text-primary hover:underline" onClick={handleNavigateForgotPassword}>
                Forgot password?
              </a>

              {/* <span className="mx-2">|</span>

              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#00bfa6] font-medium hover:underline"
              >
                Sign Up
              </Link> */}
            </p>




          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;