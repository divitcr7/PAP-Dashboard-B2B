import type React from "react";
import type { LucideIcon } from "lucide-react";
import { Users, Wrench } from "lucide-react";

interface ContractorFeatureDisplayProps {
  currentStep: number;
}

interface StatsFeature {
  type: "stats";
  title: string;
  subtitle: string;
  stats: Array<{ value: string; label: string }>;
  icon: LucideIcon;
}

interface SimpleFeature {
  type: "simple";
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
}

type FeatureContent = StatsFeature | SimpleFeature;

const ContractorFeatureDisplay: React.FC<ContractorFeatureDisplayProps> = ({
  currentStep,
}) => {
  const getFeatureContent = (): FeatureContent => {
    switch (currentStep) {
      case 1:
        return {
          type: "stats",
          title: "Join 2,000+ verified contractors",
          subtitle: "earning more with Pick-A-Pad's network",
          stats: [
            { value: "2,000+", label: "Active Contractors" },
            { value: "$150K", label: "Avg Annual Revenue" },
            { value: "4.9★", label: "Average Rating" },
            { value: "24/7", label: "Support" },
          ],
          icon: Users,
        };
      case 2:
        return {
          type: "simple",
          title: "Streamlined Business Setup",
          subtitle:
            "Get verified quickly and start receiving job opportunities from property managers across Texas.",
          bgColor: "from-green-50 to-emerald-50",
          textColor: "text-green-900",
        };
      default:
        return {
          type: "stats",
          title: "Join 2,000+ verified contractors",
          subtitle: "earning more with Pick-A-Pad",
          stats: [
            { value: "2,000+", label: "Contractors" },
            { value: "$150K", label: "Avg Revenue" },
            { value: "4.9★", label: "Rating" },
            { value: "Fast", label: "Payments" },
          ],
          icon: Wrench,
        };
    }
  };

  const feature = getFeatureContent();

  if (feature.type === "stats") {
    const IconComponent = feature.icon;
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg px-6 py-4 shadow-sm">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
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
                <div className="text-2xl font-bold text-green-600">
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

  return null;
};

export default ContractorFeatureDisplay;
