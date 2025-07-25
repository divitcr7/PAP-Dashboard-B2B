import type React from "react";
import {
  Users,
  Building2,
  Shield,
  Zap,
  Brain,
  Award,
} from "lucide-react";
import type { FeatureContent } from "@/types/featureContent";

interface SignupFeatureDisplayProps {
  currentStep: number;
}

const SignupFeatureDisplay: React.FC<SignupFeatureDisplayProps> = ({
  currentStep,
}) => {
  const getFeatureContent = (): FeatureContent => {
    switch (currentStep) {
      case 1:
        return {
          type: "stats",
          title: "Join thousands of property managers",
          subtitle:
            "who trust Pick-A-Pad to streamline their operations with AI",
          stats: [
            { value: "60%", label: "Cost Reduction" },
            { value: "11+", label: "Properties Managed" },
            { value: "98.7%", label: "AI Accuracy" },
            { value: "2.3s", label: "Processing Time" },
          ],
          icon: Users,
        };
      case 2:
        return {
          type: "simple",
          title: "AI-Powered Document Processing",
          subtitle:
            "Our advanced AI automatically extracts and verifies information from your business documents, ensuring 99.9% accuracy and instant processing.",
          bgColor: "from-blue-50 to-indigo-50",
          textColor: "text-blue-900",
        };
      case 3:
        return {
          type: "stats",
          title: "Industry-Specific AI Solutions",
          subtitle: "Tailored features for your type of business",
          stats: [
            { value: "Custom", label: "Workflows" },
            { value: "Industry", label: "Templates" },
            { value: "Compliance", label: "Tools" },
            { value: "Best", label: "Practices" },
          ],
          bgColor: "from-orange-50 to-amber-50",
          textColor: "text-orange-900",
          icon: Building2,
        };
      case 4:
        return {
          type: "statement",
          title: "Smart Communication Hub",
          subtitle:
            "Centralize all tenant communications with AI-powered auto-responses and intelligent routing",
          bgColor: "from-green-50 to-emerald-50",
          textColor: "text-green-900",
          icon: Zap,
        };
      case 5:
        return {
          type: "simple",
          title: "AI Portfolio Analytics",
          subtitle:
            "Get instant insights on your property performance with machine learning algorithms that analyze market trends, rental yields, and maintenance patterns.",
          bgColor: "from-purple-50 to-violet-50",
          textColor: "text-purple-900",
        };
      case 6:
        return {
          type: "stats",
          bgColor: "from-teal-50 to-cyan-50",
          textColor: "text-teal-900",
          title: "Dedicated Account Management",
          subtitle: "Personal support from our property management experts",
          stats: [
            { value: "1-on-1", label: "Support" },
            { value: "Expert", label: "Training" },
            { value: "Quick", label: "Response" },
            { value: "Success", label: "Manager" },
          ],
          icon: Award,
        };
      case 7:
        return {
          type: "statement",
          title: "Enterprise-Grade Security",
          subtitle:
            "Your data is protected with military-grade encryption and AI-powered threat detection",
          bgColor: "from-red-50 to-rose-50",
          textColor: "text-red-900",
          icon: Shield,
        };
      case 8:
        return {
          type: "statement",
          title: "Join thousands of property managers",
          subtitle: "who trust Pick-A-Pad's AI technology",
          bgColor: "from-blue-50 to-indigo-50",
          textColor: "text-blue-900",
          icon: Brain,
        };
      default:
        return {
          type: "statement",
          title: "Join thousands of property managers",
          subtitle: "who trust Pick-A-Pad's AI technology",
          bgColor: "from-blue-50 to-indigo-50",
          textColor: "text-blue-900",
          icon: Brain,
        };
    }
  };

  const feature = getFeatureContent();

  // Stats format (like steps 1 and 8)
  if (feature.type === "stats") {
    const IconComponent = feature.icon;
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-6 py-4 shadow-sm">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
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
                <div className="text-2xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Simple text format (steps 2, 4, 6)
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

export default SignupFeatureDisplay;
