import type React from "react";
import { UserCheck } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepSixProps {
  form: UseFormReturn<CompanySignupFormData>;
}

const StepSix: React.FC<StepSixProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Point of Contact</h1>
          <p className="text-gray-600">Primary contact person for your account</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Contact Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Smith"
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

        <FormField
          control={form.control}
          name="contactRole"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Role/Title
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Property Manager"
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

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Contact Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="john.smith@yourcompany.com"
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

        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Contact Phone
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

export default StepSix;
