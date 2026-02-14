import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { testUsers } from "../../utils/constants/users.js";



// 🔐 Username validation (ADM-001 format)
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data) => {
    const user = testUsers.find(
      (u) => u.username === data.username.toUpperCase()
    );

    if (!user) {
      return alert("User not found ");
    }

    if (!user.isForgotPassword) {
      navigate("/access-denied");
      return;
    }

    // Navigate with state
    navigate("/reset-password", {
      state: { username: user.username },
    });
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
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>

        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;
