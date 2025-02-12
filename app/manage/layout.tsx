import DashboardContainer from "@/components/dashboardContainer";
import { ComponentWithChildType } from "@/types/global";
import React from "react";

function ManageLayout({ children }: ComponentWithChildType) {
  return <DashboardContainer>{children}</DashboardContainer>;
}

export default ManageLayout;
