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

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormValues {
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