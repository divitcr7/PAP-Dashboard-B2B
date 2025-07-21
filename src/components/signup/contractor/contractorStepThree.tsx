import type React from "react";
import { Building } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ContractorStepProps } from "@/types/auth";

const ContractorStepThree: React.FC<ContractorStepProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Business Information
        </h1>
        <p className="text-gray-600">Tell us about your business</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Business Name (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Smith Contracting LLC"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center gap-4 justify-between">
          <h3 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
            Business Type
          </h3>
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex w-full gap-3">
                  {[
                    {
                      value: "sole_proprietorship",
                      label: "Sole Proprietorship",
                    },
                    { value: "llc", label: "LLC" },
                    { value: "corporation", label: "Corporation" },
                    { value: "partnership", label: "Partnership" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => field.onChange(option.value)}
                      className={`flex-1 px-3 py-2 border-2 rounded-md text-center hover:border-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer text-sm max-w-fit min-w-32 ${
                        field.value === option.value
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </FormItem>
            )}
          />
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
                  EIN (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="12-3456789"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsInBusiness"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`text-sm font-medium ${
                    fieldState.error ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Years in Business
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="5"
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

export default ContractorStepThree;
