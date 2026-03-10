"use client";
import { useSearchParams } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

function SignUpForm() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "client";

    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-deep)" }}>
            <SignUp fallbackRedirectUrl={`/sync-role?role=${role}`} />
        </div>
    );
}

export default function SignUpPage() {
    return (
        <Suspense fallback={<div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", color: "white" }}>Chargement...</div>}>
            <SignUpForm />
        </Suspense>
    );
}
