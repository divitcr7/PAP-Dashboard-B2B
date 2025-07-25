import type { UseFormReturn } from "react-hook-form";

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface CompanySignupFormValues {
  // Step 1: Company Information
  companyName: string;
  ein: string;
  website?: string;
  companyEmail: string;
  companyPhone: string;
  isEVerified: boolean;
  eVerificationNumber?: string;

  // Step 2: LLC Documentation
  llcDocument: File;
  businessLicense?: File;
  insuranceDocument?: File;

  // Step 3: Business Operations
  propertiesUnderManagement: string;
  propertiesOwned?: string;
  businessYears: string;
  businessType: string;

  // Step 4: Point of Contact
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactCity: string;
  contactState: string;
  contactZipCode: string;

  // Step 5: Account Setup
  password: string;
  confirmPassword: string;

  // Step 6: Legal & Agreements
  termsAccepted: boolean;
  privacyAccepted: boolean;
  companyEmailOnlyLogin: boolean;
}

export interface RetailerSignupFormValues {
  // Step 1: Business Information
  businessName: string;
  businessType: "sole_proprietorship" | "llc" | "corporation" | "partnership";
  ein: string;
  website?: string;
  
  // Step 2: Contact Information
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Step 3: Service Categories
  serviceCategories: string[];
  serviceDescription: string;
  
  // Step 4: Service Areas & Business Details
  serviceArea: string[];
  yearsInBusiness: string;
  businessLicense?: string;
  insuranceProvider?: string;
  insuranceAmount?: string;
  
  // Step 5: Account Setup
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  
  // Step 6: Verification
  emailOtp?: string;
  phoneOtp?: string;
}

export interface ContractorSignupFormValues {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Step 2: Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Step 3: Business Information
  businessName?: string;
  businessType: "individual" | "llc" | "corporation" | "partnership";
  ein?: string;
  yearsInBusiness: string;

  // Step 4: License & Insurance
  licenseNumber?: string;
  licenseType?: string;
  licenseExpiry?: string;
  certifications?: string[];
  hasInsurance: boolean;
  insuranceProvider?: string;
  insuranceAmount?: string;
  insuranceExpiry?: string;

  // Step 5: Services & Account
  serviceCategories: string[];
  specializations?: string;
  serviceRadius: string;
  password: string;
  confirmPassword: string;
  backgroundCheckConsent: boolean;
  termsAccepted: boolean;

  // Step 6: Verification
  emailOtp?: string;
  phoneOtp?: string;
}

// Update SignupFormValues to be a union type of all signup types
export type SignupFormValues = RetailerSignupFormValues | CompanySignupFormValues | ContractorSignupFormValues;

// types/auth.ts
export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export interface AuthFormProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  companyName: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OptionType {
  label: string;
  value: string;
}

export type ContractorFormStep = 1 | 2 | 3 | 4 | 5 | 6;

export type ContractorStepProps = {
  form: UseFormReturn<Partial<ContractorSignupFormData>>;
};

export interface ContractorSignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  businessName: string;
  businessType: "individual" | "llc" | "corporation" | "partnership";
  ein?: string;
  yearsInBusiness: string;
  licenseNumber?: string;
  licenseType?: string;
  licenseExpiry?: string;
  certifications?: string[];
  hasInsurance: boolean;
  insuranceProvider?: string;
  insuranceAmount?: string;
  insuranceExpiry?: string;
  serviceCategories?: string[];
  specializations?: string;
  serviceRadius?: string;
  backgroundCheckConsent: boolean;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  emailOtp?: string;
  phoneOtp?: string;
}
