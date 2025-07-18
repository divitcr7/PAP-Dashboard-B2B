import type React from "react";
import { Briefcase } from "lucide-react";
import { FormField, FormItem } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepFiveProps {
  form: UseFormReturn<CompanySignupFormData>;
}

const StepFive: React.FC<StepFiveProps> = ({ form }) => {
  const options = [
    "Property Management Company",
    "Real Estate Agency",
    "Investment Company",
    "Property Development",
    "Individual Investor",
    "Other",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">What type of business are you?</h1>
          <p className="text-gray-600">Help us understand your business model</p>
        </div>

      <FormField
        control={form.control}
        name="businessType"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    field.onChange(
                      option === "Property Management Company"
                        ? "property-management"
                        : option === "Real Estate Agency"
                        ? "real-estate"
                        : option === "Investment Company"
                        ? "investment"
                        : option === "Property Development"
                        ? "development"
                        : "other"
                    )
                  }
                  className={`p-4 border-2 rounded-lg text-center hover:border-blue-500 transition-all duration-200 hover:scale-105 ${
                    (field.value === "property-management" &&
                      option === "Property Management Company") ||
                    (field.value === "real-estate" &&
                      option === "Real Estate Agency") ||
                    (field.value === "investment" &&
                      option === "Investment Company") ||
                    (field.value === "development" &&
                      option === "Property Development") ||
                    (field.value === "other" && option === "Other")
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
  );
};

export default StepFive;
