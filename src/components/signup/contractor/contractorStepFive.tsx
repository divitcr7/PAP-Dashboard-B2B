import type React from "react";
import { FileText } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import type { ContractorStepProps } from "@/types/auth";

const ContractorStepFive: React.FC<ContractorStepProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Services & Specializations
        </h1>
        <p className="text-gray-600">What services do you provide?</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
        <FormField
          control={form.control}
          name="serviceCategories"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "General Contracting",
                  "Plumbing",
                  "Electrical",
                  "HVAC",
                  "Roofing",
                  "Flooring",
                  "Painting",
                  "Landscaping",
                  "Appliance Repair",
                  "Handyman Services",
                  "Cleaning",
                  "Pest Control",
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), service]);
                        } else {
                          field.onChange(
                            field.value?.filter((s) => s !== service)
                          );
                        }
                      }}
                    />
                    <label className="text-sm cursor-pointer">{service}</label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specializations"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-medium ${
                  fieldState.error ? "text-red-600" : "text-gray-700"
                }`}
              >
                Specializations (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Describe any special skills or areas of expertise..."
                  rows={3}
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

export default ContractorStepFive;
