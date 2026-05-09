import { ProfileUserProps } from "@/app/page";
import {
  SkillIconsAnsible,
  SkillIconsAwsDark,
  SkillIconsAzureDark,
  SkillIconsDocker,
  SkillIconsGcpDark,
  SkillIconsGithubDark,
  SkillIconsGitlabDark,
  SkillIconsJenkinsDark,
  SkillIconsKubernetes,
  SkillIconsNginx,
} from "@/uikits/icons";
import { siteFastLinks } from "@/utils/others";
import Link from "next/link";
import { ReactElement } from "react";

type TextSectionProps = {
  title: string;
  subTitle?: string;
};

export function SectionTitleAndSubTitle({ subTitle, title }: TextSectionProps) {
  return (
    <div className="sectionTitleAndSubTitle flex f-column">
      <h2>{title} </h2>
      {subTitle && <p>{subTitle} </p>}
    </div>
  );
}

export function MyContactInformationList({ user }: ProfileUserProps) {
  return (
    <ul className="contactInformationList">
      <li>
        <b>Age:</b> <span>{user.age} ans</span>
      </li>
      <li>
        <b>Freelance:</b> <span>{user.isAvailable ? "Oui" : "non"}</span>
      </li>
      <li>
        <b>Adresse:</b> <span>{user.address}</span>
      </li>
      <li>
        <b>Email:</b>{" "}
        <span>
          <a href="">{user.email}</a>{" "}
        </span>
      </li>
      <li>
        <b>Telephone:</b>{" "}
        <span>
          <a href="">{user.phone}</a>{" "}
        </span>
      </li>
    </ul>
  );
}

export const technologiesIconsEnum: Record<string, ReactElement> = {
  Docker: <SkillIconsDocker />,
  Kubernetes: <SkillIconsKubernetes />,
  Ansible: <SkillIconsAnsible />,
  Jenkins: <SkillIconsJenkinsDark />,
  Gcp: <SkillIconsGcpDark />,
  Azure: <SkillIconsAzureDark />,
  Github: <SkillIconsGithubDark />,
  Gitlab: <SkillIconsGitlabDark />,
  Aws: <SkillIconsAwsDark />,
  Nginx: <SkillIconsNginx />,
};

export default function SiteNavigationLink() {
  return (
    <>
      {siteFastLinks.map((link, index) => (
        <Link key={index} href={link.href}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
