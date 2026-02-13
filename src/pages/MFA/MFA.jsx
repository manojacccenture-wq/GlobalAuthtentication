import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useAuth } from "../../Context/AuthContext";

const MFA = () => {
  const navigate = useNavigate();
  const { verifyMfa } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  const email = localStorage.getItem("mfaEmail");

  const onSubmit = (data) => {
    const storedOtp = localStorage.getItem("otp");

    if (data.otp === storedOtp) {

      localStorage.removeItem("otp");
      localStorage.removeItem("mfaEmail");

      verifyMfa(); // ✅ mark authentication complete

      navigate("/dashboard");

    } else {
      alert("Invalid OTP ❌");
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
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
          >
            Verify OTP
          </Button>

        </form>

      </div>
    </div>
  );

};

export default MFA;
