"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROLES_CONFIG, ROLE_ENUM_TO_SLUG, type RoleSlug } from "../_config/roles.config";

export default function RoleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ role: string }>;
}) {
    const { role } = use(params);
    const { user }  = useAuth();
    const router    = useRouter();

    useEffect(() => {
        if (user) {
            const correct = ROLE_ENUM_TO_SLUG[user.role];
            if (correct && correct !== role) {
                router.replace(`/${correct}/dashboard`);
            }
        }
    }, [role, user, router]);

    if (!ROLES_CONFIG[role as RoleSlug]) return null;

    return <>{children}</>;
}
