import React from "react";
import { SectionTitleAndSubTitle, technologiesIconsEnum } from "../others";
import { getMarkdownData } from "@/lib/mardown";
import { projectMardownType } from "@/types/markdown/projects";
import { Projects } from "@prisma/client";

type HomeProjectsProps = {
  works: Projects[];
};
function HomeProjects({ works }: HomeProjectsProps) {
  // const { title, subTitle, projects } = (await getMarkdownData(
  //   "projects.md"
  // )) as projectMardownType;

  return (
    <div className="home-projects" id="works">
      {/* <SectionTitleAndSubTitle title={title} subTitle={subTitle} /> */}
      <div className="hp-list flex f-wrap">
        {works.map((item, i) => (
          <article
            key={"project nb " + i}
            className="projectCard flex f-column"
          >
            <div>
              <img src={item.banner.url} alt="" />
              <section>
                {/* {item.technologies.map((tech, j) => (
                  <span key={i + "tech nb" + j}>
                    {technologiesIconsEnum[tech]}
                  </span>
                ))} */}
              </section>
            </div>
            <b>{item.title} </b>
            <a href={item.link} target="_blank">
              Voir le projet
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default HomeProjects;
