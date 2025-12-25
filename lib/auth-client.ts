import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
export const authClient = createAuthClient({});

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
