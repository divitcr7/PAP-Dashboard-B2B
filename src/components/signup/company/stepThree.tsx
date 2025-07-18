import type React from "react";
import { Mail } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepThreeProps {
  form: UseFormReturn<CompanySignupFormData>;
}

const StepThree: React.FC<StepThreeProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Contact Information</h1>
          <p className="text-gray-600">Your company's primary contact details</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Company Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="admin@yourcompany.com"
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-1">
                This email will be used exclusively for login purposes
              </p>
              {fieldState.error && (
                <p className="text-sm text-red-600 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyPhone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Company Phone
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(555) 123-4567"
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-red-600 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default StepThree;
