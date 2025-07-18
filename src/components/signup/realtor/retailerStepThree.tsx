import type React from "react";
import { Package } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { RetailerSignupFormData } from "@/schemas/Auth";

interface RetailerStepThreeProps {
  form: UseFormReturn<RetailerSignupFormData>;
}

const RetailerStepThree: React.FC<RetailerStepThreeProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Service Categories
        </h1>
        <p className="text-gray-600">
          What types of products and services do you offer?
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
            <FormField
              control={form.control}
              name="serviceCategories"
              render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;
                const errorBorderClass = hasError 
                  ? "border-red-500 border-2 rounded p-4 bg-red-50" 
                  : "";

                return (
                  <FormItem>
                    <div className={`grid grid-cols-2 gap-3 ${errorBorderClass}`}>
                      {[
                        "Appliances",
                        "Building Materials",
                        "Cleaning Supplies",
                        "HVAC Equipment",
                        "Plumbing Supplies",
                        "Electrical Supplies",
                        "Landscaping",
                        "Security Systems",
                        "Maintenance Tools",
                        "Flooring",
                        "Painting Supplies",
                        "Property Management Software",
                      ].map((service) => (
                        <div
                          key={service}
                          className="flex items-center space-x-2"
                        >
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
                          <label className="text-sm cursor-pointer">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="serviceDescription"
          render={({ field, fieldState }) => {
            const hasError = !!fieldState.error;
            const errorBorderClass = hasError 
              ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
              : "border-gray-300";

            return (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Service Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                    placeholder="Describe your products and services in detail..."
                    rows={4}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
};

export default RetailerStepThree; 