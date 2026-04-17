"use client";
import { useSearchParams } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

function SignInForm() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role"); // Might be null for existing logins

    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-deep)" }}>
            <SignIn fallbackRedirectUrl={role ? `/sync-role?role=${role}` : "/sync-role"} />
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", color: "white" }}>Chargement...</div>}>
            <SignInForm />
        </Suspense>
    );
}
