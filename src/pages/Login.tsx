import React, { useCallback, useState } from "react";
import {
  Eye,
  EyeOff,
  Building2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/utils";
import { Link } from "react-router";
import type { LoginData, LoginErrors } from "@/types/auth";
import { validateLoginForm } from "@/schemas/Auth";
import ForgotPasswordForm from "@/components/ForgetPassword";

const LoginForm = ({ 
  loginData, 
  loginErrors, 
  showPassword,
  handleLoginInputChange, 
  handleLogin, 
  isLoading, 
  setShowForgotPassword, 
  showAlert, 
  alertMessage, 
  alertType,
  togglePasswordVisibility 
}: {
  loginData: LoginData;
  loginErrors: LoginErrors;
  showPassword: boolean;
  handleLoginInputChange: (field: string, value: string | boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
  setShowForgotPassword: (show: boolean) => void;
  showAlert: boolean;
  alertMessage: string;
  alertType: "error" | "success" | "info";
  togglePasswordVisibility: (e: React.MouseEvent) => void;
}) => (
    <div className="w-full max-w-md mx-auto space-y-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800">
          Welcome back
        </CardTitle>
        <CardDescription>Sign in to your Pick-A-Pad account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Alert for login errors/success */}
          {showAlert && (
            <Alert
              className={`${
                alertType === "error"
                  ? "border-red-200 bg-red-50"
                  : alertType === "success"
                  ? "border-green-200 bg-green-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <AlertCircle
                className={`h-4 w-4 ${
                  alertType === "error"
                    ? "text-red-600"
                    : alertType === "success"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              />
              <AlertDescription
                className={`${
                  alertType === "error"
                    ? "text-red-800"
                    : alertType === "success"
                    ? "text-green-800"
                    : "text-blue-800"
                }`}
              >
                {alertMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Company Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@yourcompany.com"
              value={loginData.email}
              onChange={(e) => handleLoginInputChange("email", e.target.value)}
              className={loginErrors.email ? "border-red-500" : ""}
            />
            {loginErrors.email && (
              <p className="text-sm text-red-600">{loginErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`pr-12 ${
                  loginErrors.password ? "border-red-500" : ""
                }`}
                value={loginData.password}
                onChange={(e) =>
                  handleLoginInputChange("password", e.target.value)
                }
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            {loginErrors.password && (
              <p className="text-sm text-red-600">{loginErrors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={loginData.rememberMe}
                onCheckedChange={(checked) =>
                  handleLoginInputChange("rememberMe", checked as boolean)
                }
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium p-0 h-auto"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium p-0 h-auto"
            >
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </div>
  );

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"error" | "success" | "info">(
    "info"
  );

  // Login form state
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});

  // Show alert helper
  const showAlertMessage = (
    message: string,
    type: "error" | "success" | "info" = "info"
  ) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLoginForm(loginData);

    if (!validation.isValid) {
      setLoginErrors(validation.errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.3) {
            resolve(true);
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1500);
      });

      console.log("Login data:", loginData);

      // Success toast
      toast.success("Welcome back! Login successful");

      // Success alert
      showAlertMessage(
        "Login successful! Redirecting to dashboard...",
        "success"
      );

    } catch (error) {
      console.error("Login failed:", error);

      // Error toast
      toast.error("Login failed. Please check your credentials and try again.");

      // Error alert
      showAlertMessage("Invalid email or password. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

const handleLoginInputChange = useCallback((field: string, value: string | boolean) => {
  setLoginData((prev) => ({
    ...prev,
    [field]: value,
  }));

  // Clear error when user starts typing
  if (loginErrors[field as keyof LoginErrors]) {
    setLoginErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }
}, [loginErrors]);

// And replace the togglePasswordVisibility function with this:

const togglePasswordVisibility = useCallback((e: React.MouseEvent) => {
  e.preventDefault();
  setShowPassword(prev => !prev);
}, []);

  // Company Info Component
  const CompanyInfo = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 py-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Trusted by Property Managers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
            <div>
              <div className="text-2xl font-bold text-blue-600">120+</div>
              <div className="text-xs text-gray-600">Properties Managed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">98.7%</div>
              <div className="text-xs text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">60%</div>
              <div className="text-xs text-gray-600">Cost Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">2.3s</div>
              <div className="text-xs text-gray-600">Processing Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
            Continue transforming your property management
          </p>
        </div>
      </div>

      {/* Main Content - Centered Form */}
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          {showForgotPassword ? (
            <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
          ) : (
            <LoginForm 
              loginData={loginData}
              loginErrors={loginErrors}
              showPassword={showPassword}
              handleLoginInputChange={handleLoginInputChange}
              handleLogin={handleLogin}
              isLoading={isLoading}
              setShowForgotPassword={setShowForgotPassword}
              showAlert={showAlert}
              alertMessage={alertMessage}
              alertType={alertType}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          )}
        </div>
      </div>

      {/* Company Info Below - Only show on login form */}
      {!showForgotPassword && (
        <div className="absolute bottom-6 mx-auto left-1/2 transform -translate-x-1/2">
          <CompanyInfo />
        </div>
      )}
    </div>
  );
};

export default Login;
