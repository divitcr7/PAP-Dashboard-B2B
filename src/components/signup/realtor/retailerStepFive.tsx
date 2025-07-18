import type React from "react";
import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import type { UseFormReturn } from "react-hook-form";
import type { RetailerSignupFormData } from "@/schemas/Auth";

interface RetailerStepFiveProps {
  form: UseFormReturn<RetailerSignupFormData>;
}

const RetailerStepFive: React.FC<RetailerStepFiveProps> = ({ form }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Shield className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Setup</h1>
        <p className="text-gray-600">Create your secure account</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Account Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => {
                  const hasError = !!fieldState.error;
                  const errorBorderClass = hasError 
                    ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                    : "border-gray-300";

                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 pr-12 ${errorBorderClass}`}
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => {
                  const hasError = !!fieldState.error;
                  const errorBorderClass = hasError 
                    ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                    : "border-gray-300";

                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 pr-12 ${errorBorderClass}`}
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                At least 8 characters
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                One lowercase character
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                One uppercase character
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                One number, symbol or whitespace character
              </div>
            </div>
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field, fieldState }) => {
            const hasError = !!fieldState.error;
            const errorBorderClass = hasError 
              ? "border-red-500 border-2 rounded p-2 bg-red-50" 
              : "";

            return (
              <FormItem className={`flex flex-row items-start space-x-3 space-y-0 ${errorBorderClass}`}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <p className="text-xs text-gray-500 mt-1">
                    By creating an account, you agree to our terms and acknowledge
                    our privacy practices.
                  </p>
                </div>
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
};

export default RetailerStepFive; 