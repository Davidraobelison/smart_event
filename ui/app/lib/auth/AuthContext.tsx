"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export enum UserRole {
    ADMIN = 'ADMIN',
    ORGANIZER = 'ORGANIZER',
    PROVIDER = 'PROVIDER',
    CLIENT = 'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user: clerkUser, isLoaded } = useUser();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (isLoaded && clerkUser) {
            const clerkRole = (clerkUser.publicMetadata?.role as string) || "client";

            let internalRole: UserRole = UserRole.CLIENT;
            if (clerkRole.toUpperCase() === "ADMIN") internalRole = UserRole.ADMIN;
            if (clerkRole.toUpperCase() === "ORGANISATEUR" || clerkRole.toUpperCase() === "ORGANIZER") internalRole = UserRole.ORGANIZER;
            if (clerkRole.toUpperCase() === "PRESTATAIRE" || clerkRole.toUpperCase() === "PROVIDER") internalRole = UserRole.PROVIDER;

            setUser({
                id: clerkUser.id,
                name: clerkUser.fullName || clerkUser.username || "User",
                email: clerkUser.primaryEmailAddress?.emailAddress || "",
                role: internalRole,
                avatar: clerkUser.imageUrl
            });
        } else if (isLoaded && !clerkUser) {
            setUser(null);
        }
    }, [clerkUser, isLoaded]);

    const login = (role: UserRole) => {
        // Clerk handles login
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("se_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
