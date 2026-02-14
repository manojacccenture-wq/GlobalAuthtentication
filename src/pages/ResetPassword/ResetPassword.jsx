import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PasswordStrengthInput from "../../components/UI/PasswordStrengthInput/PasswordStrengthInput";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { testUsers } from "../../utils/constants/users";

// Validation
const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data) => {
    const user = testUsers.find(
      (u) => u.username === username
    );

    if (!user) {
      alert("Something went wrong ");
      return;
    }

    user.password = data.password; // simulate update

    alert("Password updated successfully ");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md  rounded-2xl  p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <PasswordStrengthInput
            label="New Password"
            placeholder="Enter new password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Re-enter password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>

        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
