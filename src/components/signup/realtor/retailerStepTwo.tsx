import type React from "react";
import { User } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import type { RetailerSignupFormData } from "@/schemas/Auth";

interface RetailerStepTwoProps {
  form: UseFormReturn<RetailerSignupFormData>;
}

const RetailerStepTwo: React.FC<RetailerStepTwoProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Contact Information
          </h1>
          <p className="text-gray-600">Primary contact details for your business</p>
        </div>
      </div>

      <div className="space-y-6">
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
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Smith"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactTitle"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`text-sm font-medium ${
                    fieldState.error ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Contact Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Sales Manager"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`text-sm font-medium ${
                    fieldState.error ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john.smith@company.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`text-sm font-medium ${
                    fieldState.error ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                Business Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123 Business Street"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        fieldState.error ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Texas">Texas</SelectItem>
                    <SelectItem value="California">California</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Florida">Florida</SelectItem>
                  </SelectContent>
                </Select>
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
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
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
    </div>
  );
};

export default RetailerStepTwo; 