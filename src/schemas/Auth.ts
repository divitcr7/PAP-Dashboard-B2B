import { z } from "zod";
import {
  type LoginData,
  type LoginErrors,
  type ForgotPasswordData,
} from "../types/auth";

// Helper schemas
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const einRegex = /^\d{2}-\d{7}$/;
const zipRegex = /^\d{5}(-\d{4})?$/;

// Step 1: Company Information Schema
export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
  ein: z.string().regex(einRegex, "EIN must be in format XX-XXXXXXX"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  companyEmail: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  companyPhone: z
    .string()
    .regex(phoneRegex, "Phone must be in format (XXX) XXX-XXXX"),
  isEVerified: z.boolean(),
  eVerificationNumber: z.string().optional(),
}).refine(
  (data) => {
    if (data.isEVerified && !data.eVerificationNumber?.trim()) {
      return false;
    }
    return true;
  },
  {
    message: "E-Verification number is required when E-Verified is checked",
    path: ["eVerificationNumber"],
  }
);

// Step 2: LLC Documentation Schema
export const documentationSchema = z.object({
  llcDocument: z
    .any()
    .refine((file) => file instanceof File, "LLC document is required")
    .refine(
      (file) => file?.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    )
    .refine(
      (file) => {
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg",
        ];
        return allowedTypes.includes(file?.type);
      },
      "File must be PDF, DOC, DOCX, or image format"
    ),
  businessLicense: z
    .any()
    .optional()
    .refine(
      (file) => !file || file?.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    ),
  insuranceDocument: z
    .any()
    .optional()
    .refine(
      (file) => !file || file?.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    ),
});

// Step 3: Business Operations Schema
export const businessOperationsSchema = z.object({
  propertiesUnderManagement: z
    .string()
    .min(1, "Please select number of properties under management"),
  propertiesOwned: z.string().optional(),
  businessYears: z.string().min(1, "Please select years in business"),
  businessType: z.string().min(1, "Please select business type"),
});

// Step 4: Point of Contact Schema
export const contactInfoSchema = z.object({
  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must not exceed 50 characters"),
  contactRole: z
    .string()
    .min(2, "Contact role must be at least 2 characters")
    .max(50, "Contact role must not exceed 50 characters"),
  contactEmail: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  contactPhone: z
    .string()
    .regex(phoneRegex, "Phone must be in format (XXX) XXX-XXXX"),
  contactAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  contactCity: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),
  contactState: z.string().min(1, "Please select a state"),
  contactZipCode: z
    .string()
    .regex(zipRegex, "ZIP code must be in format XXXXX or XXXXX-XXXX"),
});

// Step 5: Account Security Schema
export const accountSecuritySchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must not exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Step 6: Legal & Agreements Schema
export const legalAgreementsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service",
  }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
  companyEmailOnlyLogin: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the company email usage policy",
  }),
});

// Complete form schema
export const completeSignupSchema = companyInfoSchema
  .merge(documentationSchema)
  .merge(businessOperationsSchema)
  .merge(contactInfoSchema)
  .merge(accountSecuritySchema)
  .merge(legalAgreementsSchema);

// Step schemas for validation (updated for 8-step flow)
export const stepSchemas = {
  1: z.object({ companyName: z.string().min(1, "Company name is required") }),
  2: z.object({ 
    ein: z.string().min(1, "EIN is required"),
    website: z.string().optional(),
    isEVerified: z.boolean(),
    eVerificationNumber: z.string().optional(),
    llcDocument: z.any().optional()
  }),
  3: z.object({
    companyEmail: z.string().email("Valid email required"),
    companyPhone: z.string().min(1, "Phone number required")
  }),
  4: z.object({
    propertiesUnderManagement: z.string().min(1, "Required"),
    propertiesOwned: z.string().min(1, "Required")
  }),
  5: z.object({
    businessType: z.string().min(1, "Business type required")
  }),
  6: z.object({
    contactName: z.string().min(1, "Contact name required"),
    contactEmail: z.string().email("Valid email required")
  }),
  7: z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm password")
  }),
  8: z.object({}) // Verification step - no validation needed
};

// Type exports
export type CompanyInfoData = z.infer<typeof companyInfoSchema>;
export type DocumentationData = z.infer<typeof documentationSchema>;
export type BusinessOperationsData = z.infer<typeof businessOperationsSchema>;
export type ContactInfoData = z.infer<typeof contactInfoSchema>;
export type AccountSecurityData = z.infer<typeof accountSecuritySchema>;
export type LegalAgreementsData = z.infer<typeof legalAgreementsSchema>;
export type CompanySignupFormData = z.infer<typeof completeSignupSchema>;

// Form step type
export type FormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Validation function
export const validateStep = (step: FormStep, data: Partial<CompanySignupFormData>) => {
  try {
    stepSchemas[step].parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, curr) => {
        const key = String(curr.path[0]);
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation error" } };
  }
};

// Validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Schema validation for login form
export const validateLoginForm = (data: LoginData): { isValid: boolean; errors: LoginErrors } => {
  const errors: LoginErrors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (!validatePassword(data.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Schema validation for forgot password form
export const validateForgotPasswordForm = (data: ForgotPasswordData): { isValid: boolean; error?: string } => {
  if (!data.email) {
    return { isValid: false, error: "Email is required" };
  }
  
  if (!validateEmail(data.email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
};

// Password strength checker
export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; message: string } => {
  if (password.length < 6) {
    return { strength: 'weak', message: 'Password must be at least 6 characters' };
  }
  
  if (password.length < 8) {
    return { strength: 'medium', message: 'Consider using a longer password' };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strengthCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  
  if (strengthCount >= 3) {
    return { strength: 'strong', message: 'Strong password' };
  }
  
  return { strength: 'medium', message: 'Good password' };
};

// CONTRACTOR SIGNUP SCHEMAS
// ========================

// Step 1: Personal Information
export const contractorPersonalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must not exceed 50 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address").max(100, "Email must not exceed 100 characters"),
  phone: z.string().regex(phoneRegex, "Phone must be in format (XXX) XXX-XXXX"),
});

// Step 2: Address Information
export const contractorAddressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address must not exceed 200 characters"),
  city: z.string().min(2, "City must be at least 2 characters").max(50, "City must not exceed 50 characters"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().regex(zipRegex, "ZIP code must be in format XXXXX or XXXXX-XXXX"),
});

// Step 3: Business Information
export const contractorBusinessSchema = z.object({
  businessName: z.string().optional(),
  businessType: z.enum(["individual", "llc", "corporation", "partnership"]),
  ein: z.string().optional(),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
});

// Step 4: License & Insurance
export const contractorLicenseSchema = z.object({
  licenseNumber: z.string().optional(),
  licenseType: z.string().optional(),
  licenseExpiry: z.string().optional(),
  certifications: z.array(z.string()).default([]),
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  insuranceAmount: z.string().optional(),
  insuranceExpiry: z.string().optional(),
}).refine((data) => {
  if (data.hasInsurance && (!data.insuranceProvider || !data.insuranceAmount)) {
    return false;
  }
  return true;
}, {
  message: "Insurance details are required when insurance is selected",
  path: ["insuranceProvider"],
});

// Step 5: Services & Account
export const contractorServicesSchema = z.object({
  serviceCategories: z.array(z.string()).min(1, "Please select at least one service category"),
  specializations: z.string().optional(),
  serviceRadius: z.string().min(1, "Service radius is required"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
  confirmPassword: z.string(),
  backgroundCheckConsent: z.boolean().refine((val) => val === true, {
    message: "Background check consent is required",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 6: Verification
export const contractorVerificationSchema = z.object({
  emailOtp: z.string().min(6, "Please enter the 6-digit code").max(6, "Code must be 6 digits"),
  phoneOtp: z.string().min(6, "Please enter the 6-digit code").max(6, "Code must be 6 digits"),
});

// Complete contractor form schema
export const completeContractorSignupSchema = contractorPersonalInfoSchema
  .merge(contractorAddressSchema)
  .merge(contractorBusinessSchema)
  .merge(contractorLicenseSchema)
  .merge(contractorServicesSchema)
  .merge(contractorVerificationSchema);

// Contractor step schemas
export const contractorStepSchemas = {
  1: contractorPersonalInfoSchema,
  2: contractorAddressSchema,
  3: contractorBusinessSchema,
  4: contractorLicenseSchema.partial(),
  5: contractorServicesSchema,
  6: contractorVerificationSchema.partial(),
};

// RETAILER SIGNUP SCHEMAS
// =======================

// Step 1: Business Information
export const retailerBusinessInfoSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(100, "Business name must not exceed 100 characters"),
  businessType: z.enum(["sole_proprietorship", "llc", "corporation", "partnership"]),
  ein: z.string().regex(einRegex, "EIN must be in format XX-XXXXXXX"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Step 2: Contact Information
export const retailerContactSchema = z.object({
  contactName: z.string().min(2, "Contact name must be at least 2 characters").max(50, "Contact name must not exceed 50 characters"),
  contactTitle: z.string().min(2, "Contact title must be at least 2 characters").max(50, "Contact title must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address").max(100, "Email must not exceed 100 characters"),
  phone: z.string().regex(phoneRegex, "Phone must be in format (XXX) XXX-XXXX"),
  address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address must not exceed 200 characters"),
  city: z.string().min(2, "City must be at least 2 characters").max(50, "City must not exceed 50 characters"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().regex(zipRegex, "ZIP code must be in format XXXXX or XXXXX-XXXX"),
});

// Step 3: Service Categories
export const retailerServicesSchema = z.object({
  serviceCategories: z.array(z.string()).min(1, "Please select at least one service category"),
  serviceDescription: z.string().min(10, "Service description must be at least 10 characters").max(500, "Description must not exceed 500 characters"),
});

// Step 4: Service Areas & Business Details
export const retailerBusinessDetailsSchema = z.object({
  serviceArea: z.array(z.string()).min(1, "Please select at least one service area"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  businessLicense: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceAmount: z.string().optional(),
});

// Step 5: Account Setup
export const retailerAccountSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 6: Verification
export const retailerVerificationSchema = z.object({
  emailOtp: z.string().length(6, "Email verification code must be 6 digits"),
  phoneOtp: z.string().length(6, "Phone verification code must be 6 digits"),
});

// Complete retailer form schema
export const completeRetailerSignupSchema = retailerBusinessInfoSchema
  .merge(retailerContactSchema)
  .merge(retailerServicesSchema)
  .merge(retailerBusinessDetailsSchema)
  .merge(retailerAccountSchema)
  .merge(retailerVerificationSchema.partial());

// Retailer step schemas
export const retailerStepSchemas = {
  1: retailerBusinessInfoSchema,
  2: retailerContactSchema,
  3: retailerServicesSchema,
  4: retailerBusinessDetailsSchema,
  5: retailerAccountSchema,
  6: retailerVerificationSchema.partial(),
};

// Type exports for contractor
export type ContractorPersonalInfoData = z.infer<typeof contractorPersonalInfoSchema>;
export type ContractorAddressData = z.infer<typeof contractorAddressSchema>;
export type ContractorBusinessData = z.infer<typeof contractorBusinessSchema>;
export type ContractorLicenseData = z.infer<typeof contractorLicenseSchema>;
export type ContractorServicesData = z.infer<typeof contractorServicesSchema>;
export type ContractorVerificationData = z.infer<typeof contractorVerificationSchema>;
export type ContractorSignupFormData = z.infer<typeof completeContractorSignupSchema>;
export type ContractorFormStep = 1 | 2 | 3 | 4 | 5 | 6;

// Type exports for retailer
export type RetailerBusinessInfoData = z.infer<typeof retailerBusinessInfoSchema>;
export type RetailerContactData = z.infer<typeof retailerContactSchema>;
export type RetailerServicesData = z.infer<typeof retailerServicesSchema>;
export type RetailerBusinessDetailsData = z.infer<typeof retailerBusinessDetailsSchema>;
export type RetailerAccountData = z.infer<typeof retailerAccountSchema>;
export type RetailerVerificationData = z.infer<typeof retailerVerificationSchema>;
export type RetailerSignupFormData = z.infer<typeof completeRetailerSignupSchema>;
export type RetailerFormStep = 1 | 2 | 3 | 4 | 5 | 6;

// Validation functions
export const validateContractorStep = (step: ContractorFormStep, data: Partial<ContractorSignupFormData>) => {
  try {
    contractorStepSchemas[step].parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, curr) => {
        const key = String(curr.path[0]);
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation error" } };
  }
};

export const validateRetailerStep = (step: RetailerFormStep, data: Partial<RetailerSignupFormData>) => {
  try {
    retailerStepSchemas[step].parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, curr) => {
        const key = String(curr.path[0]);
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation error" } };
  }
};