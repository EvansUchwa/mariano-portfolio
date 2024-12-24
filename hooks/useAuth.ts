"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/auth";

const useAuth = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    (state: { isAuthenticated: boolean }) => state.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/adm-login");
    }
  }, [isAuthenticated, router]);
};

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/manage/user");
    }
  }, [isAuthenticated, router]);
};

export default useAuth;
