import type React from "react";
import { Mail, CheckCircle } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CompanySignupFormData } from "@/schemas/Auth";

interface StepEightProps {
  form: UseFormReturn<CompanySignupFormData>;
}

const StepEight: React.FC<StepEightProps> = ({ form }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Check your email</h1>
          <p className="text-gray-600">We've sent your verification link to</p>
          <p className="font-medium text-gray-800">{form.watch("companyEmail")}</p>
        </div>

      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="mb-8">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Verification code
          </label>
          <div className="flex gap-2 justify-center">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 border border-blue-400 rounded text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Didn't get the email?{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Resend or edit your email address
          </button>
        </p>
      </div>
    </div>
  );
};

export default StepEight;
