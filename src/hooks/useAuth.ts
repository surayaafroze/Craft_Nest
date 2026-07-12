import { useSession } from '../app/lib/auth-client';

export function useAuth() {
  const { data, isPending, error } = useSession();

  return {
    session: data?.session,
    isAuthenticated: !!data?.session,
    isLoading: isPending,
    error,
  };
}
