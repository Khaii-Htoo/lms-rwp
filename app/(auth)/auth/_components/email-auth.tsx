"use client";
import { sentVerifyOtp } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import OtpVerify from "./otp-verify";

export default function EmailAuth() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const handleLogin = async () => {
    startTransition(async () => {
      await sentVerifyOtp(email).then(() => {
        setOpenOtpDialog(true);
      });
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
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full font-medium"
          onClick={handleLogin}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className=" animate-spin" />
          ) : (
            "   Continue with Email"
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
