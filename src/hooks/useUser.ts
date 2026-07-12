import { useSession } from '../app/lib/auth-client';

export function useUser() {
  const { data, isPending, error } = useSession();

  return {
    user: data?.user,
    isLoading: isPending,
    error,
  };
}
