import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
// social login
export const signInwithSocial = async (provider: "github" | "google") => {
  await authClient.signIn.social({
    provider,
    callbackURL: "/",
    fetchOptions: {
      onSuccess: () => {
        toast.success("We will redirect to github login");
      },
      onError: (error) => {
        toast.error("Something went wrong");
        console.log(error.error.message, "error from github login");
      },
    },
  });
};

// sent verification otp
export const sentVerifyOtp = async (email: string) => {
  await authClient.emailOtp.sendVerificationOtp({
    email,
    type: "sign-in",
    fetchOptions: {
      onSuccess: () => {
        toast.success("Email sent");
      },
      onError: (error) => {
        toast.error("Something went wrong");
        console.log(error.error.message, "error from sent verify otp");
      },
    },
  });
};

// check verification otp
export const checkVerifyOtp = async (email: string, otp: string) => {
  await authClient.signIn.emailOtp({
    email,
    otp,
    fetchOptions: {
      onSuccess: () => {
        toast.success("Verify account successfully");
        redirect("/");
      },
      onError: () => {
        toast.error("failed email verify");
      },
    },
  });
};
