"use client";
import useAuthStore from "@/stores/auth";
import { ComponentWithChildType } from "@/types/global";
import { Button, LinkButon } from "@/uikits/buttons";
import { DataSpinner } from "@/uikits/others";
import React, { useEffect } from "react";

function DashboardContainer({ children }: ComponentWithChildType) {
  const userLoading = useAuthStore((state) => state.userLoading);
  const logout = useAuthStore((state) => state.logout);
  const initialise = useAuthStore((state) => state.initialise);

  useEffect(() => {
    initialise();
  }, []);

  if (userLoading) return <DataSpinner />;
  return (
    <div>
      <div
        className="dashbaordNav flex f-wrap"
        style={{
          gap: 15,
        }}
      >
        <LinkButon variant="normal" href="/manage/user">
          Gestion de mes informations
        </LinkButon>
        <LinkButon variant="normal" href="/manage/articles">
          Gestion des articles
        </LinkButon>
        <LinkButon variant="normal" href="/manage/works">
          Gestion des projets
        </LinkButon>
        <Button onClick={logout} variant="outline">
          {" "}
          Se deconnecter
        </Button>
      </div>
      {children}
    </div>
  );
}

export default DashboardContainer;
