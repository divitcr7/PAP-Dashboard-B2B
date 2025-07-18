import type { LucideIcon } from "lucide-react";

interface StatFeature {
  type: "stats";
  title: string;
  subtitle: string;
  stats: Array<{ value: string; label: string }>;
  icon: LucideIcon;
  bgColor?: string;
  textColor?: string;
}

interface SimpleFeature {
  type: "simple";
  title: string;
  subtitle?: string;
  bgColor: string;
  textColor: string;
  icon?: never;
  stats?: never;
}

interface StatementFeature {
  type: "statement";
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  icon: LucideIcon;
  stats?: never;
}

export type FeatureContent = StatFeature | SimpleFeature | StatementFeature;
