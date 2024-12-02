import { allPageTitleAndSubtitleType } from "../global";

export type projectType = {
  name: string;
  url: string;
  technologies: string[];
};

export type projectMardownType = allPageTitleAndSubtitleType & {
  projects: projectType[];
};
