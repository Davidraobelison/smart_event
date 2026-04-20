import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ role: string }> }) {
    const { role } = await params;
    redirect(`/${role}/dashboard`);
}
