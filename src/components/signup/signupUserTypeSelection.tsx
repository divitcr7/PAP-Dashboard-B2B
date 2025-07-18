import type React from "react";
import { useState } from "react";
import { Building2, Wrench, Store, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserTypeSelectionProps {
  onUserTypeSelect: (userType: "company" | "contractor" | "retailer") => void;
}

const SignupUserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  onUserTypeSelect,
}) => {
  const [selectedType, setSelectedType] = useState<
    "company" | "contractor" | "retailer" | null
  >(null);

  const userTypes = [
    {
      id: "company" as const,
      title: "Property Management Company",
      subtitle:
        "Property managers, real estate agencies, and investment companies",
      description:
        "Manage properties, screen tenants, and grow your portfolio with AI-powered tools",
      icon: Building2,
      features: [
        "AI Tenant Screening",
        "Portfolio Management",
        "Automated Workflows",
        "Analytics Dashboard",
      ],
      bgColor: "from-blue-500 to-purple-600",
      borderColor: "border-blue-200 hover:border-blue-400",
      textColor: "text-blue-700",
    },
    {
      id: "contractor" as const,
      title: "Contractor / Service Professional",
      subtitle: "Maintenance, leasing, repair, and construction professionals",
      description:
        "Join our network of verified contractors and grow your business",
      icon: Wrench,
      features: [
        "Background Verification",
        "Job Matching",
        "Payment Processing",
        "Performance Tracking",
      ],
      bgColor: "from-green-500 to-teal-600",
      borderColor: "border-green-200 hover:border-green-400",
      textColor: "text-green-700",
    },
    {
      id: "retailer" as const,
      title: "Retailer / Service Provider",
      subtitle: "Suppliers, vendors, and service providers",
      description:
        "Partner with property managers and expand your customer base",
      icon: Store,
      features: [
        "Business Verification",
        "Marketplace Access",
        "Order Management",
        "Performance Analytics",
      ],
      bgColor: "from-orange-500 to-red-600",
      borderColor: "border-orange-200 hover:border-orange-400",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white w-full">
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

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-10 pb-20">
        {/* Improved Title Section */}
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-1">
              Join Pick-A-Pad
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Choose how you'd like to get started
            </p>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Select the option that best describes your role and business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
            {userTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.id;

              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : `${type.borderColor} bg-white`
                  }`}
                >
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${type.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {type.subtitle}
                    </p>
                    <p className="text-sm text-gray-700">{type.description}</p>
                  </div>

                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div
                          className={`w-2 h-2 rounded-full ${type.textColor.replace(
                            "text-",
                            "bg-"
                          )} mr-3`}
                        ></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="h-4 w-4 text-white font-bold" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={() => selectedType && onUserTypeSelect(selectedType)}
              disabled={!selectedType}
              variant="link"
              className="text-blue-500 py-3 px-12 rounded-md font-medium hover:text-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              Continue with{" "}
              {selectedType
                ? userTypes.find((t) => t.id === selectedType)?.title
                : "Selection"}
            </Button>
          </div>
        </div>
      </div>

      {/* Improved Bottom Info */}
      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-8 pt-4 pb-2 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-sm"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full border-2 border-white shadow-sm"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <p className="text-lg font-semibold text-gray-800 ml-4">
                Trusted by <span className="text-blue-600">5,000+</span>{" "}
                property professionals across Texas
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center justify-center">
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold text-blue-600">98.7%</div>
                <div className="text-xs text-gray-600 font-medium">
                  AI Accuracy
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold text-green-600">60%</div>
                <div className="text-xs text-gray-600 font-medium">
                  Cost Reduction
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold text-purple-600">2.3s</div>
                <div className="text-xs text-gray-600 font-medium">
                  Processing Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupUserTypeSelection;
