import type React from "react";
import { useState } from "react";
import { Shield, Mail, Phone, Check, X } from "lucide-react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ContractorStepProps } from "@/types/auth";

const ContractorStepSix: React.FC<ContractorStepProps> = ({ form }) => {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const sendEmailOtp = async () => {
    // Simulate sending email OTP
    console.log("Sending email OTP to:", form.watch("email"));
    setEmailOtpSent(true);
  };

  const sendPhoneOtp = async () => {
    // Simulate sending phone OTP
    console.log("Sending phone OTP to:", form.watch("phone"));
    setPhoneOtpSent(true);
  };

  const verifyEmailOtp = async () => {
    // Simulate OTP verification
    const otp = form.watch("emailOtp");
    if (otp === "123456") {
      // Mock verification
      setEmailVerified(true);
    }
  };

  const verifyPhoneOtp = async () => {
    // Simulate OTP verification
    const otp = form.watch("phoneOtp");
    if (otp === "654321") {
      // Mock verification
      setPhoneVerified(true);
    }
  };

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
                    <p className="text-sm text-gray-600">
                      We've sent a verification code to your email. Please enter
                      it below:
                    </p>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="emailOtp"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={verifyEmailOtp}
                        disabled={form.watch("emailOtp")?.length !== 6}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Verify
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
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
                    <p className="text-sm text-gray-600">
                      We've sent a verification code to your phone. Please enter
                      it below:
                    </p>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="phoneOtp"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={verifyPhoneOtp}
                        disabled={form.watch("phoneOtp")?.length !== 6}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Verify
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
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
        {emailVerified && phoneVerified && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3 text-green-700">
                <Check className="w-6 h-6" />
                <span className="font-medium">All verifications complete!</span>
              </div>
              <p className="text-center text-sm text-green-600 mt-2">
                You can now create your contractor account
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContractorStepSix;
