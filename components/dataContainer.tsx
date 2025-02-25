import { PageContainerProps } from "@/types/global";
import React from "react";

type DataContainerProps = {
  children: React.ReactNode;
  title: string;
  actionButton?: React.ReactNode;
};
export function DataContainer({
  children,
  title,
  actionButton,
}: DataContainerProps) {
  return (
    <div className="dataContainer flex f-column f-wrap">
      <h1>{title}</h1>
      {actionButton && actionButton}
      <div className="flex f-wrap">{children}</div>
    </div>
  );
}
