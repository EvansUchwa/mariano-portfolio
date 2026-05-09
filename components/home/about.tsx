import React from "react";
import { MyContactInformationList, SectionTitleAndSubTitle } from "../others";
import { ProfileUserProps } from "@/app/page";

function HomeAbout({ user }: ProfileUserProps) {
  return (
    <div className="home-about">
      <SectionTitleAndSubTitle
        title="A propos de moi"
        subTitle="Mon hsitoire"
      />
      <div
        dangerouslySetInnerHTML={{
          __html: user.description,
        }}
      ></div>
      <MyContactInformationList user={user} />
    </div>
  );
}

export default HomeAbout;
