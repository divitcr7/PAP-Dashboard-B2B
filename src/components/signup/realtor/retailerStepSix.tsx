import type React from "react";
import { useState } from "react";
import { CheckCircle, Mail, Phone } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { RetailerSignupFormData } from "@/schemas/Auth";

interface RetailerStepSixProps {
  form: UseFormReturn<RetailerSignupFormData>;
}

const RetailerStepSix: React.FC<RetailerStepSixProps> = ({ form }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);

  const sendEmailOtp = async () => {
    // Mock function - would integrate with actual email service
    setEmailSent(true);
  };

  const sendPhoneOtp = async () => {
    // Mock function - would integrate with actual SMS service
    setPhoneSent(true);
  };

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
          We've sent verification codes to your email and phone
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Verification */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Mail className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold">Email Verification</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Verification code sent to: <strong>{form.watch("email")}</strong>
            </p>
            
            <FormField
              control={form.control}
              name="emailOtp"
              render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;
                const errorBorderClass = hasError 
                  ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                  : "border-gray-300";

                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Verification Code
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          className={`flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={sendEmailOtp}
                        disabled={emailSent}
                        className="whitespace-nowrap"
                      >
                        {emailSent ? "Code Sent" : "Resend Code"}
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>

        {/* Phone Verification */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Phone className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold">Phone Verification</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Verification code sent to: <strong>{form.watch("phone")}</strong>
            </p>
            
            <FormField
              control={form.control}
              name="phoneOtp"
              render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;
                const errorBorderClass = hasError 
                  ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                  : "border-gray-300";

                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Phone Verification Code
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          className={`flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={sendPhoneOtp}
                        disabled={phoneSent}
                        className="whitespace-nowrap"
                      >
                        {phoneSent ? "Code Sent" : "Resend Code"}
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>

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