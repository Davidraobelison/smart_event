"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrestatairePage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/Prestataire/dashboard");
    }, [router]);

    return null;
}
