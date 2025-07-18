import type React from "react";
import { TrendingUp } from "lucide-react";
import { FormField, FormItem } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepFourProps {
  form: UseFormReturn<CompanySignupFormData>;
}

const StepFour: React.FC<StepFourProps> = ({ form }) => {
  const managementOptions = [
    "1-5 properties",
    "6-10 properties",
    "11-25 properties",
    "26-50 properties",
    "51-100 properties",
    "100+ properties",
  ];

  const ownedOptions = [
    "0 properties",
    "1-2 properties",
    "3-5 properties",
    "6-10 properties",
    "11-25 properties",
    "25+ properties",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto -mt-10">
      <div className="mb-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Property Portfolio</h1>
          <p className="text-gray-600">Tell us about your property management portfolio</p>
        </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            Properties Under Management
          </h3>
          <FormField
            control={form.control}
            name="propertiesUnderManagement"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {managementOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => field.onChange(option)}
                      className={`p-3 border-2 rounded-lg text-center hover:border-blue-500 transition-all duration-200 hover:scale-105 ${
                        field.value === option
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            Properties You Own
          </h3>
          <FormField
            control={form.control}
            name="propertiesOwned"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ownedOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => field.onChange(option)}
                      className={`p-3 border-2 rounded-lg text-center hover:border-blue-500 transition-all duration-200 hover:scale-105 ${
                        field.value === option
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFour;
