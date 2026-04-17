// Re-export depuis la nouvelle architecture — ne pas modifier ce fichier
export { AuthProvider, AuthContext, UserRole } from '@/providers/AuthProvider';
export type { User } from '@/providers/AuthProvider';
export { useAuth } from '@/hooks/useAuth';
