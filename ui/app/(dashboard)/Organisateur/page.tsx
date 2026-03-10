"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganisateurPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/Organisateur/dashboard");
    }, [router]);

    return null;
}
