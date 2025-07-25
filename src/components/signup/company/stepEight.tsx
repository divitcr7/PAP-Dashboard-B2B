import type React from "react";
import { useState, useRef } from "react";
import { Mail, CheckCircle } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";
import type { CompanySignupFormValues } from "@/types/auth";
import { useAuth } from "@/context/useAuthContext";
import { toast } from "@/utils";

interface StepEightProps {
  form: UseFormReturn<CompanySignupFormData>;
  onSuccess?: () => void;
}

const StepEight: React.FC<StepEightProps> = ({ form, onSuccess }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { signup } = useAuth();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== "") && newOtp.join("") === "00000") {
      handleVerification(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async (otpCode: string) => {
    if (otpCode !== "00000") {
      toast.error("Invalid OTP", {
        description: "Please enter the correct verification code.",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const formData = form.getValues();
      const signupData: CompanySignupFormValues = {
        companyName: formData.companyName,
        ein: formData.ein,
        website: formData.website,
        companyEmail: formData.companyEmail,
        companyPhone: formData.companyPhone,
        isEVerified: formData.isEVerified,
        eVerificationNumber: formData.eVerificationNumber,
        llcDocument: formData.llcDocument,
        businessLicense: formData.businessLicense,
        insuranceDocument: formData.insuranceDocument,
        propertiesUnderManagement: formData.propertiesUnderManagement,
        propertiesOwned: formData.propertiesOwned,
        businessYears: formData.businessYears,
        businessType: formData.businessType,
        contactName: formData.contactName,
        contactRole: formData.contactRole,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactAddress: formData.contactAddress,
        contactCity: formData.contactCity,
        contactState: formData.contactState,
        contactZipCode: formData.contactZipCode,
        password: "mockPassword123!", // This should come from form data in production
        confirmPassword: "mockPassword123!", // This should come from form data in production
        termsAccepted: true, // This should come from form data in production
        privacyAccepted: true, // This should come from form data in production
        companyEmailOnlyLogin: true, // This should come from form data in production
      };

      await signup(signupData);
      
      toast.success("Account verified!", {
        description: "Your account has been successfully created and verified.",
      });
      
      onSuccess?.();
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Verification failed", {
        description: "There was an error verifying your account. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = () => {
    toast.success("Email resent", {
      description: "We've sent another verification email to your inbox.",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Check your email</h1>
        <p className="text-gray-600">We've sent your verification link to</p>
        <p className="font-medium text-gray-800">{form.watch("companyEmail")}</p>
      </div>

      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="mb-8">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Verification code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                disabled={isVerifying}
                className="w-12 h-12 border border-blue-400 rounded text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Demo: Enter "00000" to verify
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Didn't get the email?{" "}
          <button
            type="button"
            onClick={handleResendEmail}
            disabled={isVerifying}
            className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
          >
            Resend or edit your email address
          </button>
        </p>
      </div>
    </div>
  );
};

export default StepEight;