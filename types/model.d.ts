import { Projects } from "@prisma/client";

export type ProjectsWithSubModel = Projects<{
  include: {
    banner: true;
    technologies: true;
  };
}>;
