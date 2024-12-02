"use server";
import React from "react";
import { SectionTitleAndSubTitle, technologiesIconsEnum } from "../others";
import { getMarkdownData } from "@/lib/mardown";
import { projectMardownType } from "@/types/markdown/projects";

async function HomeProjects() {
  const { title, subTitle, projects } = (await getMarkdownData(
    "projects.md"
  )) as projectMardownType;

  return (
    <div className="home-projects">
      <SectionTitleAndSubTitle title={title} subTitle={subTitle} />
      <div className="hp-list flex f-wrap">
        {projects.map((item, i) => (
          <article
            key={"project nb " + i}
            className="projectCard flex f-column"
          >
            <div>
              <img
                src="https://placehold.co/600x400/000000/FFFFFF/png"
                alt=""
              />
              <section>
                {item.technologies.map((tech, j) => (
                  <span key={i + "tech nb" + j}>
                    {technologiesIconsEnum[tech]}
                  </span>
                ))}
              </section>
            </div>
            <b>{item.name} </b>
            <a href={item.url} target="_blank">
              Voir le projet
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default HomeProjects;
