import type React from "react";
import { useState } from "react";


import SignupUserTypeSelection from "../components/signup/signupUserTypeSelection";
import CompanySignup from "@/components/signup/company/companySignup";
import ContractorSignup from "@/components/signup/contractor/contractorSIgnup";
import RetailerSignup from "@/components/signup/realtor/realtorSignup";

type UserType = "company" | "contractor" | "retailer" | null;

const Signup: React.FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (userType: UserType) => {
    setSelectedUserType(userType);
  };

  const handleBackToSelection = () => {
    setSelectedUserType(null);
  };

  if (!selectedUserType) {
    return <SignupUserTypeSelection onUserTypeSelect={handleUserTypeSelect} />;
  }

  switch (selectedUserType) {
    case "company":
      return <CompanySignup onBack={handleBackToSelection} />;
    case "contractor":
      return <ContractorSignup onBack={handleBackToSelection} />;
    case "retailer":
      return <RetailerSignup onBack={handleBackToSelection} />;
    default:
      return (
        <SignupUserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
      );
  }
};

export default Signup;
