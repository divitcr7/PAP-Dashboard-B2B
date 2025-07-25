import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/useAuthContext";
import type { CompanySignupFormData, FormStep } from "@/schemas/Auth";

// Import step components
import StepOne from "@/components/signup/company/stepOne";
import StepTwo from "@/components/signup/company/stepTwo";
import StepThree from "@/components/signup/company/stepThree";
import StepFour from "@/components/signup/company/stepFour";
import StepFive from "@/components/signup/company/stepFive";
import StepSix from "@/components/signup/company/stepSix";
import StepSeven from "@/components/signup/company/stepSeven";
import StepEight from "@/components/signup/company/stepEight";
import SignupFeatureDisplay from "@/components/signup/company/signupFeatureDisplay";

interface CompanySignupProps {
  onBack: () => void;
}

const CompanySignup: React.FC<CompanySignupProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const totalSteps = 8;

  const form = useForm<CompanySignupFormData>({
    // resolver: zodResolver(completeContractorSignupSchema),
    defaultValues: {
      companyName: "",
      ein: "",
      website: "",
      companyEmail: "",
      companyPhone: "",
      isEVerified: false,
      eVerificationNumber: "",
      llcDocument: null,
      businessLicense: null,
      insuranceDocument: null,
      propertiesUnderManagement: "",
      propertiesOwned: "",
      businessYears: "",
      businessType: "",
      contactName: "",
      contactRole: "",
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      contactCity: "",
      contactState: "Texas",
      contactZipCode: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      privacyAccepted: false,
      companyEmailOnlyLogin: false,
    },
    mode: "onChange",
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const handleSubmit = async (data: CompanySignupFormData) => {
    const completeData = {
      ...data,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "Texas",
      zipCode: "",
      certifications: [],
      hasInsurance: false,
      insuranceProvider: "",
      insuranceAmount: "",
      insuranceExpiry: "",
      serviceCategories: [],
      specializations: "",
      serviceRadius: "",
      backgroundCheckConsent: false,
      emailOtp: "",
      phoneOtp: "",
      yearsInBusiness: "",
      businessType: "individual" as const, // Using a valid literal type
    };
    try {
      if (currentStep === totalSteps) {
        await signup(completeData);
        navigate("/dashboard");
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof CompanySignupFormData
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(fieldName, file);
    }
  };

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  );

  const renderCurrentStep = () => {
    const stepProps = {
      form,
      handleFileChange,
    };

    switch (currentStep) {
      case 1:
        return <StepOne {...stepProps} />;
      case 2:
        return <StepTwo {...stepProps} />;
      case 3:
        return <StepThree {...stepProps} />;
      case 4:
        return <StepFour {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      case 6:
        return <StepSix {...stepProps} />;
      case 7:
        return <StepSeven {...stepProps} />;
      case 8:
        return <StepEight {...stepProps} />;
      default:
        return <StepOne {...stepProps} />;
    }
  };

  const canProceed = () => true;
  // const canProceed = () => {
  //   switch (currentStep) {
  //     case 1:
  //       return form.watch("companyName");
  //     case 2:
  //       return form.watch("ein");
  //     case 3:
  //       return form.watch("companyEmail") && form.watch("companyPhone");
  //     case 4:
  //       return (
  //         form.watch("propertiesUnderManagement") &&
  //         form.watch("propertiesOwned")
  //       );
  //     case 5:
  //       return form.watch("businessType");
  //     case 6:
  //       return form.watch("contactName") && form.watch("contactEmail");
  //     case 7:
  //       return form.watch("password") && form.watch("confirmPassword");
  //     case 8:
  //       return true;
  //     default:
  //       return false;
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white w-full">
      <ProgressBar />

      {/* Top Left Logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Pick-A-Pad</h1>
          <p className="text-xs text-gray-500">
            Transform your property management with AI
          </p>
        </div>
      </div>

      {/* Step Counter - Top Right */}
      <div className="absolute top-6 right-6 text-right">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        {currentStep != 1 && (
          <div className="mt-1 text-center text-sm text-blue-600">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Main Content - Centered Form */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-24">
        <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="relative">
                {
                  <button
                    type="button"
                    onClick={currentStep != 1 ? prevStep : onBack}
                    className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:scale-105 cursor-pointer group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    {`Back ${currentStep != 1 ? "" : "to Selection"}`}
                  </button>
                }

                {renderCurrentStep()}
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || !canProceed()}
                  className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : currentStep === totalSteps ? (
                    "Create Account"
                  ) : (
                    <div className="flex items-center">
                      Next
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {currentStep === 1 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feature Display at Bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
        <SignupFeatureDisplay currentStep={currentStep} />
      </div>
    </div>
  );
};

export default CompanySignup;
