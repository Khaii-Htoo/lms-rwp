import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialAuth from "./_components/social-auth";
import EmailAuth from "./_components/email-auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-3">
          <div className="relative h-16 w-16 mb-2">
            <Image
              src="/logo.png"
              alt="LMS Platform Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Welcome Back
          </h1>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Email Login Section */}
          <EmailAuth />

          {/* Styled Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Auth  */}
          <div className="grid grid-cols-2 gap-4">
            <SocialAuth provider="github" />
            <SocialAuth provider="google" />
          </div>

          {/* Footer / Legal */}
          <footer className="px-4 text-center text-xs text-muted-foreground leading-relaxed">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </footer>
        </CardContent>
      </Card>
    </main>
  );
}
