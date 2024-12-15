import React from "react";
import { SectionTitleAndSubTitle, technologiesIconsEnum } from "../others";
import { getMarkdownData } from "@/lib/mardown";
import { skillsMardownType } from "@/types/markdown/projects";

async function HomeSkills() {
  const { title, subTitle, skills } = (await getMarkdownData(
    "skills.md"
  )) as skillsMardownType;

  return (
    <div className="home-skills" id="skills">
      <SectionTitleAndSubTitle title={title} subTitle={subTitle} />
      <div className="hs-list flex f-wrap">
        {skills.map((item, i) => (
          <article key={"skill nb " + i} className="skillCard flex">
            {technologiesIconsEnum[item.name]}
            <b>{item.name} </b>
          </article>
        ))}
      </div>
    </div>
  );
}

export default HomeSkills;
