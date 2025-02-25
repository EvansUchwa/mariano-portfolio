import { Projects } from "@prisma/client";

export type ProjectsWithSubModel = Projects<{
  include: {
    subModel: true;
  };
}>;
