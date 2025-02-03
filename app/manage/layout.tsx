"use client";
import useAuthStore from "@/stores/auth";
import { LinkButon, Button } from "@/uikits/buttons";
import React, { ReactNode } from "react";

function ManageLayout({ children }: { children: ReactNode }) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="dashboard">
      <h1>Ton mini Dashboard</h1>
      <br />
      <br />
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

export default ManageLayout;
