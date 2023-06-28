import { useQuery, useQueryClient } from '@tanstack/react-query';

type GraphQLData = { [key: string]: unknown; [index: number]: never };
type GraphqlResponse<TData extends GraphQLData> = {
  data?: TData;
  errors?: Array<{ message: string }>;
  extensions?: unknown;
};

type IdToken = {
  email: string;
  name: string;
  picture: string;
  sub: string;
};

export function useUserClaims() {
  const getClaims = async () => {
    const claims = {
      email: '',
      name: '',
      picture: '',
      sub: '',
    };
    return claims || null;
  };
  return useQuery<IdToken | null>(['userClaims'], getClaims, {
    cacheTime: 1000 * 60 * 60,
    enabled: true,
  });
}

export function useUser() {
  const { data } = useUserClaims();
  return {
    email: data?.email || '',
    name: data?.name || '',
    imageUrl: data?.picture || '',
  };
}

export function useUserId() {
  const claims = useUserClaims();
  return claims.data?.sub || null;
}

export function useAuth() {
  const auth0Props = { logout: (foo) => console.log('logout') };
  const claimsQ = useUserClaims();
  const userId = claimsQ.data?.sub;
  return { ...auth0Props, userId };
}

export function useAuthActions() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    queryClient.clear();
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return { handleLogout };
}
