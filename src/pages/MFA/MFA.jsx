import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const MFA = () => {
  const navigate = useNavigate();

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
      navigate("/dashboard");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-[20px]">
      <div className="w-full max-w-[393px]">

        <h2 className="text-center text-xl font-bold mb-6">
  Verify Code
        </h2>

        <p className="text-center text-sm mb-6 text-gray-500">
          OTP sent to {email}
          
        </p>
        <p className="text-center text-sm mb-6 text-gray-500">Enter the six digit code verify from your email</p>

        <form onSubmit={handleSubmit(onSubmit)}>

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

          <div className="mt-4">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
            >
              Verify OTP
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MFA;
