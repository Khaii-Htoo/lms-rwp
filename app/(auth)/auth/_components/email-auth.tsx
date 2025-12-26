"use client";
import { sentVerifyOtp } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import OtpVerify from "./otp-verify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailAuth() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleLogin = async () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setEmailError("");
    startTransition(async () => {
      try {
        await sentVerifyOtp(email);
        setOpenOtpDialog(true);
      } catch (error) {
        console.error("OTP send failed:", error);
      }
    });
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className={
              emailError
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {emailError && (
            <p className="text-sm text-destructive  mb-3">{emailError}</p>
          )}
        </div>
        <Button
          type="button"
          className="w-full font-medium"
          onClick={handleLogin}
          disabled={isPending || !!emailError}
        >
          {isPending ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Continue with Email"
          )}
        </Button>
      </div>
      <OtpVerify
        isOpen={openOtpDialog}
        setIsOpen={setOpenOtpDialog}
        email={email}
      />
    </>
  );
}
