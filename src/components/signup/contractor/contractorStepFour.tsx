import type React from "react";
import { Shield } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { UseFormReturn } from "react-hook-form";
import type { ContractorSignupFormData } from "@/schemas/Auth";

interface ContractorStepFourProps {
  form: UseFormReturn<ContractorSignupFormData>;
}

const ContractorStepFour: React.FC<ContractorStepFourProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          License & Insurance
        </h1>
        <p className="text-gray-600">Professional credentials and coverage</p>
      </div>

      <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Professional License</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium ${
                        fieldState.error ? "text-red-600" : "text-gray-700"
                      }`}
                    >
                      License Number (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                          fieldState.error ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="TX123456789"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseType"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium ${
                        fieldState.error ? "text-red-600" : "text-gray-700"
                      }`}
                    >
                      License Type (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                          fieldState.error ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="General Contractor"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h3 className="text-lg font-semibold mb-4">Insurance Coverage</h3>
            
            <FormField
              control={form.control}
              name="hasInsurance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    I have professional liability insurance
                  </FormLabel>
                </FormItem>
              )}
            />

            {form.watch("hasInsurance") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-sm font-medium ${
                          fieldState.error ? "text-red-600" : "text-gray-700"
                        }`}
                      >
                        Insurance Provider
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                            fieldState.error ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="State Farm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insuranceAmount"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-sm font-medium ${
                          fieldState.error ? "text-red-600" : "text-gray-700"
                        }`}
                      >
                        Coverage Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                            fieldState.error ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="$1,000,000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
      </div>
    </div>
  );
};

export default ContractorStepFour; 