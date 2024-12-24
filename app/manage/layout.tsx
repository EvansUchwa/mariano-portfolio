"use client";
import useAuthStore from "@/stores/auth";
import { LinkButon } from "@/uikits/buttons";
import React, { ReactNode } from "react";

function ManageLayout({ children }: { children: ReactNode }) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="dashboard">
      <h1>Ton mini Dashboard</h1>
      <br />
      <br />
      <div className="flex">
        <LinkButon variant="normal" href="/manage/user">
          Gestion de mes informations
        </LinkButon>
        <LinkButon variant="normal" href="/manage/blog">
          Gestion du blog
        </LinkButon>
        <button onClick={logout}>Se deconnecter</button>
      </div>
      {children}
    </div>
  );
}

export default ManageLayout;
