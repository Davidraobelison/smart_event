import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SyncRolePage({
    searchParams,
}: {
    searchParams: Promise<{ role?: string }>;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const client = await clerkClient();
    const searchParamsObj = await searchParams;
    const urlRole = searchParamsObj.role;

    if (urlRole) {
        let internalRole = "client";
        const normalizedRole = urlRole.toLowerCase();

        if (normalizedRole === "organisateur" || normalizedRole === "organizer") internalRole = "organisateur";
        if (normalizedRole === "prestataire" || normalizedRole === "provider") internalRole = "prestataire";
        if (normalizedRole === "admin") internalRole = "admin";

        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: internalRole
            }
        });

        redirect(`/${internalRole}/dashboard`);
    } else {
        // Existing user login
        const user = await client.users.getUser(userId);
        const existingRole = (user.publicMetadata?.role as string) || "client";

        redirect(`/${existingRole}/dashboard`);
    }

    return null;
}
