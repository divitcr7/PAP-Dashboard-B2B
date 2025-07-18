import type React from "react";
import { Building2 } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepOneProps {
  form: UseFormReturn<CompanySignupFormData>;
}

const StepOne: React.FC<StepOneProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">What's your company name?</h1>
        <p className="text-gray-600">Let's start with your company information</p>
      </div>

      <FormField
        control={form.control}
        name="companyName"
        render={({ field, fieldState }) => (
          <FormItem className="max-w-md mx-auto">
            <FormLabel
              className={`text-sm font-medium ${
                fieldState.error ? "text-red-600" : "text-gray-700"
              }`}
            >
              Company name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                  fieldState.error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="ABC Property Management LLC"
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
  );
};

export default StepOne;
