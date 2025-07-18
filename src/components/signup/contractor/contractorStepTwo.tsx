import type React from "react";
import { MapPin } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { ContractorSignupFormData } from "@/schemas/Auth";

interface ContractorStepTwoProps {
  form: UseFormReturn<ContractorSignupFormData>;
}

const ContractorStepTwo: React.FC<ContractorStepTwoProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Address Information
        </h1>
        <p className="text-gray-600">Where are you located?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Street Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123 Main Street"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                City
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Dallas"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                State
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select State</option>
                  <option value="Texas">Texas</option>
                  <option value="California">California</option>
                  <option value="Florida">Florida</option>
                  <option value="New York">New York</option>
                  {/* Add more states as needed */}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                ZIP Code
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="75201"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContractorStepTwo; 