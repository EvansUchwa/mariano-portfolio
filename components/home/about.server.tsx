import React from "react";
import { MyContactInformationList, SectionTitleAndSubTitle } from "../others";
import { getMarkdownData } from "@/lib/mardown";
import { contactInfosType } from "@/types/global";

async function HomeAbout() {
  const contactData = (await getMarkdownData("contact.md")) as contactInfosType;
  return (
    <div className="home-about">
      <SectionTitleAndSubTitle
        title="A propos de moi"
        subTitle="Mon hsitoire"
      />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, amet
          inventore velit dignissimos animi ea commodi voluptatibus pariatur
          rerum, quaerat voluptas rem! Expedita numquam modi adipisci odit
          laboriosam, sequi perferendis!
        </p>
        <br />
        <p>
          Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed
          cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor
          sagittis lacus. Pellentesque posuere. Praesent turpis. Aenean posuere,
          tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
          urna dolor sagittis lacus. Pellentesque posuere. Praesent turpis.
          Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu
          sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales
          nec, volutpat a, suscipit non, turpis.
        </p>
      </div>
      <MyContactInformationList contactData={contactData} />
    </div>
  );
}

export default HomeAbout;
