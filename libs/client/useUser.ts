import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser(isPublic?: boolean) {
  const { data, error } = useSWR(isPublic ? null : "/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]); 
  return { user: data?.profile, isLoading: !data && !error };
}