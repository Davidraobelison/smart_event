"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import styles from "./Home.module.css";

import HomeNavbar      from "./_components/home/HomeNavbar";
import HeroSection     from "./_components/home/HeroSection";
import ProblemSection  from "./_components/home/ProblemSection";
import FeaturesSection from "./_components/home/FeaturesSection";
import PersonasSection from "./_components/home/PersonasSection";
import CtaBand         from "./_components/home/CtaBand";
import RoleModal       from "./_components/home/RoleModal";
import HomeFooter      from "./_components/home/HomeFooter";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [modalMode, setModalMode]             = useState<"login" | "signup">("signup");

  const openRoleModal = (mode: "login" | "signup") => {
    setModalMode(mode);
    setIsRoleModalOpen(true);
  };

  const handleRoleSelect = (roleId: string) => {
    const destination = modalMode === "signup" ? "/sign-up" : "/sign-in";
    router.push(`${destination}?role=${roleId.toLowerCase()}`);
    setIsRoleModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <HomeNavbar
        isLoaded={isLoaded}
        isSignedIn={!!isSignedIn}
        onOpenModal={openRoleModal}
      />
      <HeroSection
        isSignedIn={!!isSignedIn}
        onOpenModal={openRoleModal}
      />
      <ProblemSection />
      <FeaturesSection onOpenModal={openRoleModal} />
      <PersonasSection onRoleSelect={handleRoleSelect} />
      <CtaBand onOpenModal={openRoleModal} />
      <RoleModal
        isOpen={isRoleModalOpen}
        mode={modalMode}
        onClose={() => setIsRoleModalOpen(false)}
        onRoleSelect={handleRoleSelect}
      />
      <HomeFooter />
    </div>
  );
}
