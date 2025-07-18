import type React from "react";
import { Shield, Store } from "lucide-react";
import type { FeatureContent } from "@/types/featureContent";

interface RetailerFeatureDisplayProps {
  currentStep: number;
}

const RetailerFeatureDisplay: React.FC<RetailerFeatureDisplayProps> = ({
  currentStep,
}) => {
  const getFeatureContent = (): FeatureContent => {
    switch (currentStep) {
      case 1:
        return {
          type: "stats",
          title: "Join 500+ verified retailers",
          subtitle: "growing with Pick-A-Pad",
          stats: [
            { value: "500+", label: "Retailers" },
            { value: "40%", label: "Growth" },
            { value: "1,000+", label: "Orders" },
            { value: "Fast", label: "Pay" },
          ],
          icon: Store,
        };
      case 2:
        return {
          type: "simple",
          title: "Contact Information Security",
          subtitle: "Your contact details are encrypted and stored securely to protect your privacy.",
          bgColor: "from-orange-50 to-red-50",
          textColor: "text-orange-900",
        };
      case 3:
        return {
          type: "simple",
          title: "Service Category Matching",
          subtitle: "Our AI-powered system matches you with relevant property managers based on your services.",
          bgColor: "from-orange-50 to-red-50",
          textColor: "text-orange-900",
        };
      case 4:
        return {
          type: "simple",
          title: "Expand Your Service Area",
          subtitle: "Reach property managers across multiple cities to grow your business.",
          bgColor: "from-orange-50 to-red-50",
          textColor: "text-orange-900",
        };
      case 5:
        return {
          type: "simple",
          title: "Secure Account Setup",
          subtitle: "Your account is protected with enterprise-grade security measures.",
          bgColor: "from-orange-50 to-red-50",
          textColor: "text-orange-900",
        };
      case 6:
        return {
          type: "statement",
          title: "Ready to Join Pick-A-Pad?",
          subtitle:
            "Your account will be reviewed and verified within 24-48 hours. Once approved, you'll gain access to our property manager network and can start receiving orders.",
          bgColor: "from-orange-50 to-red-50",
          textColor: "text-orange-900",
          icon: Shield,
        };
      default:
        return {
          type: "simple",
          title: "Join 500+ verified retailers",
          bgColor: "from-orange-50 to-red-50",
          textColor: "text-orange-900",
        };
    }
  };

  const feature = getFeatureContent();

  if (feature.type === "stats") {
    const IconComponent = feature.icon;
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg px-6 py-4 shadow-sm">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
              <IconComponent className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4 text-center">
            {feature.subtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {feature.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  {stat.value}
                  <span className="ml-2 text-xs font-medium text-gray-600">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (feature.type === "simple") {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div
          className={`bg-gradient-to-r ${feature.bgColor} rounded-lg px-6 py-4 shadow-sm`}
        >
          <h3
            className={`text-lg font-semibold ${feature.textColor} mb-2 text-center`}
          >
            {feature.title}
          </h3>
          <p
            className={`text-sm ${feature.textColor} opacity-80 text-center leading-relaxed`}
          >
            {feature.subtitle}
          </p>
        </div>
      </div>
    );
  }

  // Statement format with icon (steps 3, 5, 7)
  if (feature.type === "statement") {
    const IconComponent = feature.icon;
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div
          className={`bg-gradient-to-r ${feature.bgColor} rounded-lg px-6 py-4 shadow-sm`}
        >
          <div className="flex items-center justify-center mb-3">
            <div
              className={`w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3`}
            >
              <IconComponent className={`h-4 w-4 ${feature.textColor}`} />
            </div>
            <h3 className={`text-lg font-semibold ${feature.textColor}`}>
              {feature.title}
            </h3>
          </div>
          <p className={`text-sm ${feature.textColor} opacity-80 text-center`}>
            {feature.subtitle}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default RetailerFeatureDisplay;
