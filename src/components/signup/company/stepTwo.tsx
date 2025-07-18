import type React from "react";
import { Upload, Shield } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepTwoProps {
  form: UseFormReturn<CompanySignupFormData>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof CompanySignupFormData
  ) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ form, handleFileChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Registration Details</h1>
        <p className="text-gray-600">Provide your legal business information and documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="ein"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                EIN Number
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="12-3456789"
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
          name="website"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Website
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="www.yourcompany.com"
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

        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="isEVerified"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Company is E-Verified
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {form.watch("isEVerified") && (
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="eVerificationNumber"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    className={`text-sm font-medium ${
                      fieldState.error ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    E-Verification Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                        fieldState.error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter E-Verification number"
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
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LLC Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              id="llcDocument"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "llcDocument")}
              className="hidden"
            />
            <label htmlFor="llcDocument" className="cursor-pointer">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Upload LLC document</p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, or image (max 10MB)
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
