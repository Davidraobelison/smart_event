"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganisateurPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/organisateur/dashboard");
    }, [router]);

    return null;
}
