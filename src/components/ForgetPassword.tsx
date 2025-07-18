import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "@/utils";
import { validateEmail } from "@/schemas/Auth";

interface Props {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<Props> = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return toast.error("Email is required");
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return toast.error("Invalid email");
    }

    setLoading(true);
    setError("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) resolve(true);
          else reject(new Error("Email not found"));
        }, 1500);
      });

      setEmailSent(true);
      toast.success("Reset email sent");
    } catch (err) {
      toast.error("Failed to send email");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center text-teal-600 hover:text-teal-700 font-medium mb-4 p-0 h-auto justify-start"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-3xl font-bold text-gray-800">
          Reset your password
        </CardTitle>
        <CardDescription>
          Enter your email address and we’ll send you a reset link
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </div>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Check your email
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent a reset link to <strong>{email}</strong>
            </p>
            <Button
              variant="link"
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
