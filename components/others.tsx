import { contactInfosType } from "@/types/global";
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

type MyContactInformationListProps = {
  contactData: contactInfosType;
};
export function MyContactInformationList({
  contactData,
}: MyContactInformationListProps) {
  return (
    <ul className="contactInformationList">
      <li>
        <b>Age:</b> <span>{contactData.age} ans</span>
      </li>
      <li>
        <b>Freelance:</b> <span>{contactData.available ? "Oui" : "non"}</span>
      </li>
      <li>
        <b>Adresse:</b> <span>{contactData.address}</span>
      </li>
      <li>
        <b>Email:</b>{" "}
        <span>
          <a href="">{contactData.email}</a>{" "}
        </span>
      </li>
      <li>
        <b>Telephone:</b>{" "}
        <span>
          <a href="">+{contactData.tel}</a>{" "}
        </span>
      </li>
    </ul>
  );
}

export const technologiesIconsEnum: any = {
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
