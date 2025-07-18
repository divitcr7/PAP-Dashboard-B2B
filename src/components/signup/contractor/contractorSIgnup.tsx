import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/useAuthContext";
import type {
  ContractorSignupFormData,
  ContractorFormStep,
} from "@/schemas/Auth";
import { completeContractorSignupSchema } from "@/schemas/Auth";

// Import step components
import ContractorStepOne from "./contractorStepOne";
import ContractorStepTwo from "./contractorStepTwo";
import ContractorStepThree from "./contractorStepThree";
import ContractorStepFour from "./contractorStepFour";
import ContractorStepFive from "./contractorStepFive";
import ContractorStepSix from "./contractorStepSix";
import ContractorFeatureDisplay from "./contractorFeatureDisplay";

interface ContractorSignupProps {
  onBack: () => void;
}

const ContractorSignup: React.FC<ContractorSignupProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<ContractorFormStep>(1);
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const totalSteps = 6;

  const form = useForm<ContractorSignupFormData>({
    // resolver: zodResolver(completeContractorSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "Texas",
      zipCode: "",
      businessName: "",
      businessType: "individual",
      ein: "",
      yearsInBusiness: "",
      licenseNumber: "",
      licenseType: "",
      licenseExpiry: "",
      certifications: [],
      hasInsurance: false,
      insuranceProvider: "",
      insuranceAmount: "",
      insuranceExpiry: "",
      serviceCategories: [],
      specializations: "",
      serviceRadius: "",
      backgroundCheckConsent: false,
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      emailOtp: "",
      phoneOtp: "",
    },
    mode: "onChange",
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as ContractorFormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as ContractorFormStep);
    }
  };

  const handleSubmit = async (data: ContractorSignupFormData) => {
    try {
      if (currentStep === totalSteps) {
        await signup(data);
        navigate("/dashboard");
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Contractor signup failed:", error);
    }
  };

  // Progress Bar Component - HubSpot Style Orange
  const ProgressBar = () => (
    <>
      {/* Orange Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Header with Logo and Progress Text */}
      <div className="fixed top-1 left-0 right-0 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Pick-A-Pad</h1>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep != 1 && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    const stepProps = { form };

    switch (currentStep) {
      case 1:
        return <ContractorStepOne {...stepProps} />;
      case 2:
        return <ContractorStepTwo {...stepProps} />;
      case 3:
        return <ContractorStepThree {...stepProps} />;
      case 4:
        return <ContractorStepFour {...stepProps} />;
      case 5:
        return <ContractorStepFive {...stepProps} />;
      case 6:
        return <ContractorStepSix {...stepProps} />;
      default:
        return <ContractorStepOne {...stepProps} />;
    }
  };

  const canProceed = () => true;
  // const canProceed = () => {
  //   switch (currentStep) {
  //     case 1:
  //       return form.watch("firstName") && form.watch("lastName") && form.watch("email") && form.watch("phone");
  //     case 2:
  //       return form.watch("address") && form.watch("city") && form.watch("state") && form.watch("zipCode");
  //     case 3:
  //       return form.watch("businessType") && form.watch("yearsInBusiness");
  //     case 4:
  //       return true; // License and insurance are optional
  //     case 5:
  //       return (
  //         form.watch("serviceCategories")?.length > 0 &&
  //         form.watch("password") &&
  //         form.watch("confirmPassword") &&
  //         form.watch("password") === form.watch("confirmPassword") &&
  //         form.watch("termsAccepted") &&
  //         form.watch("backgroundCheckConsent")
  //       );
  //     case 6:
  //       return true; // Verification step
  //     default:
  //       return false;
  //   }
  // };

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar />
      <div className="flex pt-20">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <div className="relative">
                  {/* Back buttons positioned absolutely in top-left corner */}
                  {
                    <button
                      type="button"
                      onClick={currentStep !== 1 ? prevStep : onBack}
                      className="absolute top-4 left-4 z-10 flex items-center text-green-600 hover:text-green-700 font-medium transition-all duration-200 hover:scale-105 cursor-pointer group"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                      {currentStep !== 1 ? "Back" : "Back to Selection"}
                    </button>
                  }

                  {/* Your current step content */}
                  {renderCurrentStep()}
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isLoading || !canProceed()}
                    className="bg-green-600 text-white py-3 px-8 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 cursor-pointer"
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
          </div>
        </div>
      </div>

      {/* Feature Display at Bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
        <ContractorFeatureDisplay currentStep={currentStep} />
      </div>
    </div>
  );
};

export default ContractorSignup;
