import { useNavigate, useSearch } from '@tanstack/router';

export function useSiteURL() {
  const { siteUrl } = useSearch({});
  const navigate = useNavigate();
  return [
    siteUrl,
    (newUrl: string) => navigate({ search: (prev) => ({ ...prev, siteUrl: newUrl }) }),
  ] as const;
}
