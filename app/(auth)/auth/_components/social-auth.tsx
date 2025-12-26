"use client";

import { signInwithSocial } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Github, Chrome, Loader } from "lucide-react";
import { useTransition } from "react";

type Provider = "github" | "google";

const providerIcons: Record<
  Provider,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  github: Github,
  google: Chrome,
};

export default function SocialAuth({ provider }: { provider: Provider }) {
  const Icon = providerIcons[provider];
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signInwithSocial(provider);
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className=" animate-spin" />
      ) : (
        <>
          {" "}
          <Icon className="mr-2 h-4 w-4" />
          {provider === "github" ? "Github" : "Google"}
        </>
      )}
    </Button>
  );
}
