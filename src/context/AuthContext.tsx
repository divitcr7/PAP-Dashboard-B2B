import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// import axiosInstance from "@/lib/axiosInstance"; // Commented out for mock
import type { LoginFormValues, User, SignupFormValues } from "@/types/auth";
// import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/utils";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const MOCK_USERS = {
  "test@pap.com": {
    id: "1",
    email: "test@pap.com",
    name: "John Doe",
    companyName: "PAP Technologies",
    role: "admin",
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
};

// Helper function to extract email from different signup form types
const getEmailFromSignupData = (data: SignupFormValues): string => {
  if ('email' in data) {
    return data.email; // RetailerSignupFormValues or ContractorSignupFormValues
  } else if ('companyEmail' in data) {
    return data.companyEmail; // CompanySignupFormValues
  }
  throw new Error("No email found in signup data");
};

// Helper function to extract name from different signup form types
const getNameFromSignupData = (data: SignupFormValues): string => {
  if ('firstName' in data && 'lastName' in data) {
    // ContractorSignupFormValues
    return `${data.firstName} ${data.lastName}`;
  } else if ('contactName' in data) {
    // RetailerSignupFormValues or CompanySignupFormValues
    return data.contactName;
  }
  return "Demo User";
};

// Helper function to extract company name from different signup form types
const getCompanyNameFromSignupData = (data: SignupFormValues): string => {
  if ('companyName' in data) {
    return data.companyName; // CompanySignupFormValues
  } else if ('businessName' in data && data.businessName) {
    return data.businessName; // RetailerSignupFormValues or ContractorSignupFormValues
  }
  return "Demo Company";
};

const MOCK_CREDENTIALS = {
  email: "test@pap.com",
  password: "7890poiU@"
};

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status on app load
    const checkAuthStatus = async () => {
      try {
        // Check if token exists in cookies
        const token = getCookie("auth_token");

        if (token) {
          // Check if user data exists in sessionStorage
          const storedUser = sessionStorage.getItem("demo_user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token exists but no user data, clear token
            deleteCookie("auth_token");
          }
        }

        /* COMMENTED OUT - REAL API CODE
        if (token) {
          // Set the token in axios headers
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          // Fetch current user from your API
          const response = await axiosInstance.get("/auth/me");

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            deleteCookie("auth_token");
            delete axiosInstance.defaults.headers.common["Authorization"];
          }
        }
        */
      } catch (error) {
        console.error("Auth verification failed:", error);
        deleteCookie("auth_token");
        sessionStorage.removeItem("demo_user");
        // delete axiosInstance.defaults.headers.common["Authorization"]; // Commented out
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate network delay
    setTimeout(checkAuthStatus, 500);
  }, []);

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check mock credentials
      if (data.email === MOCK_CREDENTIALS.email && data.password === MOCK_CREDENTIALS.password) {
        const mockUser = MOCK_USERS[data.email as keyof typeof MOCK_USERS];
        const mockToken = `mock_token_${Date.now()}`;
        
        // Store in sessionStorage and cookies
        sessionStorage.setItem("demo_user", JSON.stringify(mockUser));
        setCookie("auth_token", mockToken, 7); // 7 days
        
        setUser(mockUser);
        
        toast.success("Login successful", {
          description: "Welcome back!",
        });
      } else {
        throw new Error("Invalid email or password");
      }

      /* COMMENTED OUT - REAL API CODE
      // Login through your API
      const response = await axiosInstance.post("/auth/login", data);

      if (response.data.success) {
        const token = response.data.token;
        setCookie("auth_token", token, 7);

        // Set the token in axios headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || "Login failed");
      }
      */
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create mock user from signup data
      const email = getEmailFromSignupData(data);
      const name = getNameFromSignupData(data);
      const companyName = getCompanyNameFromSignupData(data);
      
      const newUser: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        companyName: companyName,
        role: "user",
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = `mock_token_${Date.now()}`;
      
      // Store in sessionStorage and cookies
      sessionStorage.setItem("demo_user", JSON.stringify(newUser));
      setCookie("auth_token", mockToken, 7); // 7 days
      
      setUser(newUser);
      
      toast.success("Account created successfully", {
        description: "Welcome to the platform!",
      });

      /* COMMENTED OUT - REAL API CODE
      // Determine signup type based on data structure
      const endpoint = "businessType" in data ? "/auth/register/retailer" : 
                      "contractorType" in data ? "/auth/register/contractor" : 
                      "/auth/register/company";
      
      // Signup through your API
      const response = await axiosInstance.post(endpoint, data);

      if (response.data.success) {
        const token = response.data.token;
        setCookie("auth_token", token, 7);

        // Set the token in axios headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
      */
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear sessionStorage and cookies
      sessionStorage.removeItem("demo_user");
      deleteCookie("auth_token");
      setUser(null);
      
      toast.success("Logout successful", {
        description: "You have been successfully logged out.",
      });

      /* COMMENTED OUT - REAL API CODE
      await axiosInstance.post("/auth/logout");

      deleteCookie("auth_token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setUser(null);
      */
    } catch (error) {
      console.error("Logout failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during logout.";
      toast.error("Logout failed", {
        description: errorMessage,
      });

      // Force logout even if API fails
      sessionStorage.removeItem("demo_user");
      deleteCookie("auth_token");
      setUser(null);
      // delete axiosInstance.defaults.headers.common["Authorization"]; // Commented out
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };