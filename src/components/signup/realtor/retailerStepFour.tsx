import type React from "react";
import { MapPin } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { RetailerSignupFormData } from "@/schemas/Auth";

interface RetailerStepFourProps {
  form: UseFormReturn<RetailerSignupFormData>;
}

const RetailerStepFour: React.FC<RetailerStepFourProps> = ({ form }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Service Areas & Business Details
        </h1>
        <p className="text-gray-600">
          Where do you provide services and additional business information?
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <FormField
              control={form.control}
              name="serviceArea"
              render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;
                const errorBorderClass = hasError 
                  ? "border-red-500 border-2 rounded p-4 bg-red-50" 
                  : "";

                return (
                  <FormItem>
                    <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${errorBorderClass}`}>
                      {[
                        "Dallas",
                        "Houston",
                        "Austin",
                        "San Antonio",
                        "Fort Worth",
                        "El Paso",
                        "Arlington",
                        "Corpus Christi",
                        "Plano",
                        "Lubbock",
                        "Garland",
                        "Irving",
                      ].map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(area)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), area]);
                              } else {
                                field.onChange(
                                  field.value?.filter((a) => a !== area)
                                );
                              }
                            }}
                          />
                          <label className="text-sm cursor-pointer">{area}</label>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="yearsInBusiness"
            render={({ field, fieldState }) => {
              const hasError = !!fieldState.error;
              const errorBorderClass = hasError 
                ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                : "border-gray-300";

              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Years in Business
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                      placeholder="10"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="businessLicense"
            render={({ field, fieldState }) => {
              const hasError = !!fieldState.error;
              const errorBorderClass = hasError 
                ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                : "border-gray-300";

              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Business License (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                      placeholder="License number"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="insuranceProvider"
            render={({ field, fieldState }) => {
              const hasError = !!fieldState.error;
              const errorBorderClass = hasError 
                ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                : "border-gray-300";

              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Insurance Provider (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                      placeholder="Insurance company name"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="insuranceAmount"
            render={({ field, fieldState }) => {
              const hasError = !!fieldState.error;
              const errorBorderClass = hasError 
                ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
                : "border-gray-300";

              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Insurance Amount (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${errorBorderClass}`}
                      placeholder="$1,000,000"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RetailerStepFour;
