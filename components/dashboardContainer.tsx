"use client";
import useAuthStore from "@/stores/auth";
import { ComponentWithChildType } from "@/types/global";
import { Button, LinkButon } from "@/uikits/buttons";
import React from "react";

function DashboardContainer({ children }: ComponentWithChildType) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      <div
        className="flex f-wrap"
        style={{
          gap: 15,
        }}
      >
        <LinkButon variant="normal" href="/manage/user">
          Gestion de mes informations
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
