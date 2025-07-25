import type React from "react";
import { useState, useRef } from "react";
import { CheckCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { RetailerSignupFormData } from "@/schemas/Auth";
import type { RetailerSignupFormValues } from "@/types/auth";
import { toast } from "@/utils";
import { useAuth } from "@/context/useAuthContext";

interface RetailerStepSixProps {
  form: UseFormReturn<RetailerSignupFormData>;
  onSuccess?: () => void;
}

const RetailerStepSix: React.FC<RetailerStepSixProps> = ({ 
  form, 
  onSuccess 
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);
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
    setEmailSent(true);
    toast.success("Email OTP sent", {
      description: "Check your email for the verification code.",
    });
  };

  const sendPhoneOtp = async () => {
    setPhoneSent(true);
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
      const signupData: RetailerSignupFormValues = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        ein: formData.ein,
        website: formData.website,
        contactName: formData.contactName,
        contactTitle: formData.contactTitle,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        serviceCategories: formData.serviceCategories || [],
        serviceDescription: formData.serviceDescription || "",
        serviceArea: formData.serviceArea || [],
        yearsInBusiness: formData.yearsInBusiness || "",
        businessLicense: formData.businessLicense,
        insuranceProvider: formData.insuranceProvider,
        insuranceAmount: formData.insuranceAmount,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
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
          className="w-12 h-12 border border-orange-400 rounded text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Contact Information
        </h1>
        <p className="text-gray-600">
          We need to verify your email and phone number to complete your registration
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Verification */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Mail className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold">Email Verification</h3>
              {emailVerified && (
                <div className="ml-auto flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Verified</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Verification code sent to: <strong>{form.watch("email")}</strong>
            </p>
            
            {!emailVerified && (
              <div className="space-y-4">
                {!emailSent ? (
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
                    <div className="text-center">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Email Verification Code
                      </label>
                      <OtpInputs 
                        otp={emailOtp} 
                        type="email" 
                        disabled={isVerifying} 
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Demo: Enter "00000" to verify
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={sendEmailOtp}
                        disabled={isVerifying}
                        className="text-sm"
                      >
                        Resend Code
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phone Verification */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Phone className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold">Phone Verification</h3>
              {phoneVerified && (
                <div className="ml-auto flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Verified</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Verification code sent to: <strong>{form.watch("phone")}</strong>
            </p>
            
            {!phoneVerified && (
              <div className="space-y-4">
                {!phoneSent ? (
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
                    <div className="text-center">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone Verification Code
                      </label>
                      <OtpInputs 
                        otp={phoneOtp} 
                        type="phone" 
                        disabled={isVerifying} 
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Demo: Enter "00000" to verify
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={sendPhoneOtp}
                        disabled={isVerifying}
                        className="text-sm"
                      >
                        Resend Code
                      </Button>
                    </div>
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
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">All verifications complete!</span>
              </div>
              <p className="text-center text-sm text-green-600 mt-2">
                Creating your retailer account...
              </p>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-sm text-gray-600">
          <p>
            Didn't receive the codes?{" "}
            <button
              type="button"
              className="text-orange-600 hover:text-orange-700 font-medium"
              onClick={() => {
                sendEmailOtp();
                sendPhoneOtp();
              }}
              disabled={isVerifying}
            >
              Resend both codes
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RetailerStepSix;