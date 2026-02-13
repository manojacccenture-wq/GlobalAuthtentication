import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas/signup.schema";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Checkbox from "../../components/UI/CheckBox/Checkbox";
import PasswordStrengthInput from "../../components/UI/PasswordStrengthInput/PasswordStrengthInput";
import { testUsers } from "../../utils/constants/users";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            identifier: "",
            password: "",
            confirmPassword: "",
            terms: false,
            marketingConsent: false,
        },
    });

    const identifier = watch("identifier");
    const password = watch("password");

    const detectedType = useMemo(() => {
        if (!identifier) return null;
        if (identifier.includes("@")) return "email";
        if (identifier.startsWith("+") || /^[0-9]+$/.test(identifier))
            return "phone";
        return null;
    }, [identifier]);

    const onSubmit = (data) => {

        const normalizedIdentifier = data.identifier.trim().toLowerCase();

        // 🔍 Check duplicate
        const existingUser = testUsers.find(
            (user) =>
                user.email?.toLowerCase() === normalizedIdentifier
        );

        if (existingUser) {
            alert("User already exists");
            return;
        }

        const newUser = {
            id: testUsers.length + 1,
            fullName: data.fullName.trim(),
            email: normalizedIdentifier,
            password: data.password || null, // null if phone signup
            createdAt: new Date().toISOString(),
        };

        testUsers.push(newUser);

        navigate("/")



    };


    return (
        <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl  rounded-2xl  p-6 sm:p-8 md:p-10">

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">

                    {/* 1️⃣ FULL NAME */}
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        {...register("fullName")}
                    />

                    {/* 2️⃣ EMAIL OR PHONE */}
                    <Input
                        label="Email or Mobile Number"
                        placeholder="Enter your email or mobile number"
                        helperText={
                            errors.identifier?.message ||
                            "We'll use this to create your account"
                        }
                        error={!!errors.identifier}
                        {...register("identifier")}
                    />

                    {/* 3️⃣ PASSWORD (ONLY FOR EMAIL) */}
                    {detectedType === "email" && (
                        <>
                            <PasswordStrengthInput
                                label="Password"
                                placeholder="Enter password"
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
                        </>
                    )}

                    {/* 5️⃣ TERMS CHECKBOX (REQUIRED) */}
                    <Checkbox
                        {...register("terms")}
                        label={
                            <span>
                                I agree to the{" "}
                                <a
                                    href="#"
                                    target="_blank"
                                    className="text-[#00bfa6] underline"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    target="_blank"
                                    className="text-[#00bfa6] underline"
                                >
                                    Privacy Policy
                                </a>
                            </span>
                        }
                    />
                    {errors.terms && (
                     <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.terms.message}
                        </p>
                    )}

                    {/* 6️⃣ MARKETING CONSENT (OPTIONAL - GDPR STYLE) */}
                    <Checkbox
                        {...register("marketingConsent")}
                        label="I agree to receive marketing emails"
                    />

                    {/* 7️⃣ SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting
                            ? detectedType === "email"
                                ? "Creating Account..."
                                : "Sending OTP..."
                            : detectedType === "email"
                                ? "Create Account"
                                : "Send OTP"}
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default SignUp;
