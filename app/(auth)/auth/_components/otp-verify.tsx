"use client";
import { checkVerifyOtp } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader, Send } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  email: string;
}

export default function OtpVerify({ isOpen, setIsOpen, email }: Props) {
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleOtp = async () => {
    startTransition(async () => {
      await checkVerifyOtp(email, otp);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-center">
            {" "}
            Please check your email{" "}
          </DialogTitle>
          <DialogDescription className=" text-center">
            {" "}
            We have a sent verification code to your email addresss .Please open
            the email and paste the code below
          </DialogDescription>
        </DialogHeader>
        <div className=" flex justify-center items-center py-5">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button onClick={handleOtp} disabled={otp.length != 6 || isPending}>
          {isPending ? (
            <Loader className=" animate-spin" />
          ) : (
            <>
              {" "}
              <Send /> Verify Otp
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
