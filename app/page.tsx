"use client";
import HomeAbout from "@/components/home/about";
import HomeBanner from "@/components/home/banner";
import HomeContact from "@/components/home/contact";
import HomeProjects from "@/components/home/project";
import HomeSkills from "@/components/home/skills";
import useCustomQuery from "../hooks/useQuery";
import { Projects, Users } from "@prisma/client";

type ProfileProps = {
  user: Users;
  works: Projects[];
};

export type ProfileUserProps = {
  user: Users;
};
export default function Home() {
  const { data, isLoading } = useCustomQuery<ProfileProps>("/api/profile");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={"home"}>
      <HomeBanner user={data!.user} />
      <HomeAbout user={data!.user} />
      <HomeProjects works={data!.works} />
      <HomeSkills />
      <HomeContact user={data!.user} />
    </div>
  );
}
