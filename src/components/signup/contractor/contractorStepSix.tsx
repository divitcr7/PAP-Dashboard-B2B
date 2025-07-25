import type React from "react";
import { useState, useRef } from "react";
import { Shield, Mail, Phone, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { ContractorSignupFormData } from "@/schemas/Auth";
import type { ContractorSignupFormValues } from "@/types/auth";
import { useAuth } from "@/context/useAuthContext";
import { toast } from "@/utils";

interface ContractorStepSixProps {
  form: UseFormReturn<ContractorSignupFormData>;
  onSuccess?: () => void;
}

const ContractorStepSix: React.FC<ContractorStepSixProps> = ({
  form,
  onSuccess,
}) => {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [phoneOtp, setPhoneOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { signup } = useAuth();

  const handleOtpChange = (
    index: number,
    value: string,
    type: 'email' | 'phone'
  ) => {
    if (value.length > 1) return;
    
    const setOtp = type === 'email' ? setEmailOtp : setPhoneOtp;
    const currentOtp = type === 'email' ? emailOtp : phoneOtp;
    const inputRefs = type === 'email' ? emailInputRefs : phoneInputRefs;
    
    const newOtp = [...currentOtp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== "") && newOtp.join("") === "00000") {
      if (type === 'email') {
        verifyEmailOtp(newOtp.join(""));
      } else {
        verifyPhoneOtp(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent,
    type: 'email' | 'phone'
  ) => {
    const currentOtp = type === 'email' ? emailOtp : phoneOtp;
    const inputRefs = type === 'email' ? emailInputRefs : phoneInputRefs;
    
    if (e.key === "Backspace" && !currentOtp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const sendEmailOtp = async () => {
    console.log("Sending email OTP to:", form.watch("email"));
    setEmailOtpSent(true);
    toast.success("Email OTP sent", {
      description: "Check your email for the verification code.",
    });
  };

  const sendPhoneOtp = async () => {
    console.log("Sending phone OTP to:", form.watch("phone"));
    setPhoneOtpSent(true);
    toast.success("SMS OTP sent", {
      description: "Check your phone for the verification code.",
    });
  };

  const verifyEmailOtp = async (otpCode?: string) => {
    const otp = otpCode || emailOtp.join("");
    if (otp === "00000") {
      setEmailVerified(true);
      toast.success("Email verified!", {
        description: "Your email has been successfully verified.",
      });
      
      // Check if both are verified and complete signup
      if (phoneVerified) {
        await completeSignup();
      }
    } else {
      toast.error("Invalid OTP", {
        description: "Please enter the correct email verification code.",
      });
    }
  };

  const verifyPhoneOtp = async (otpCode?: string) => {
    const otp = otpCode || phoneOtp.join("");
    if (otp === "00000") {
      setPhoneVerified(true);
      toast.success("Phone verified!", {
        description: "Your phone number has been successfully verified.",
      });
      
      // Check if both are verified and complete signup
      if (emailVerified) {
        await completeSignup();
      }
    } else {
      toast.error("Invalid OTP", {
        description: "Please enter the correct phone verification code.",
      });
    }
  };

  const completeSignup = async () => {
    if (!emailVerified || !phoneVerified) return;
    
    setIsVerifying(true);
    try {
      const formData = form.getValues();
      const signupData: ContractorSignupFormValues = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        businessName: formData.businessName,
        businessType: formData.businessType,
        ein: formData.ein,
        yearsInBusiness: formData.yearsInBusiness,
        licenseNumber: formData.licenseNumber,
        licenseType: formData.licenseType,
        licenseExpiry: formData.licenseExpiry,
        certifications: formData.certifications,
        hasInsurance: formData.hasInsurance,
        insuranceProvider: formData.insuranceProvider,
        insuranceAmount: formData.insuranceAmount,
        insuranceExpiry: formData.insuranceExpiry,
        serviceCategories: formData.serviceCategories,
        specializations: formData.specializations,
        serviceRadius: formData.serviceRadius,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        backgroundCheckConsent: formData.backgroundCheckConsent,
        termsAccepted: formData.termsAccepted,
        emailOtp: emailOtp.join(""),
        phoneOtp: phoneOtp.join("")
      };

      await signup(signupData);
      onSuccess?.();
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed", {
        description: "There was an error creating your account. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const OtpInputs = ({ 
    otp, 
    type, 
    disabled 
  }: { 
    otp: string[], 
    type: 'email' | 'phone', 
    disabled: boolean 
  }) => (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => {
            if (type === 'email') {
              emailInputRefs.current[index] = el;
            } else {
              phoneInputRefs.current[index] = el;
            }
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={e => handleOtpChange(index, e.target.value, type)}
          onKeyDown={e => handleKeyDown(index, e, type)}
          disabled={disabled}
          className="w-12 h-12 border border-green-400 rounded text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Contact Information
        </h1>
        <p className="text-gray-600">
          We need to verify your email and phone number to complete your
          registration
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Verification */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold">Email Verification</h3>
                  <p className="text-sm text-gray-600">{form.watch("email")}</p>
                </div>
              </div>
              {emailVerified ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-400">
                  <X className="w-5 h-5 mr-2" />
                  <span className="text-sm">Not verified</span>
                </div>
              )}
            </div>

            {!emailVerified && (
              <div className="space-y-4">
                {!emailOtpSent ? (
                  <Button
                    type="button"
                    onClick={sendEmailOtp}
                    className="w-full"
                    variant="outline"
                  >
                    Send Email Verification Code
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">
                      We've sent a verification code to your email. Please enter
                      it below:
                    </p>
                    <OtpInputs 
                      otp={emailOtp} 
                      type="email" 
                      disabled={isVerifying} 
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Demo: Enter "00000" to verify
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={sendEmailOtp}
                        className="text-green-600 hover:text-green-700 cursor-pointer"
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phone Verification */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold">Phone Verification</h3>
                  <p className="text-sm text-gray-600">{form.watch("phone")}</p>
                </div>
              </div>
              {phoneVerified ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-400">
                  <X className="w-5 h-5 mr-2" />
                  <span className="text-sm">Not verified</span>
                </div>
              )}
            </div>

            {!phoneVerified && (
              <div className="space-y-4">
                {!phoneOtpSent ? (
                  <Button
                    type="button"
                    onClick={sendPhoneOtp}
                    className="w-full"
                    variant="outline"
                  >
                    Send SMS Verification Code
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">
                      We've sent a verification code to your phone. Please enter
                      it below:
                    </p>
                    <OtpInputs 
                      otp={phoneOtp} 
                      type="phone" 
                      disabled={isVerifying} 
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Demo: Enter "00000" to verify
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={sendPhoneOtp}
                        className="text-green-600 hover:text-green-700 cursor-pointer"
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Verification Status */}
        {emailVerified && phoneVerified && !isVerifying && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3 text-green-700">
                <Check className="w-6 h-6" />
                <span className="font-medium">All verifications complete!</span>
              </div>
              <p className="text-center text-sm text-green-600 mt-2">
                Creating your contractor account...
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContractorStepSix;