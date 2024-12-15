import HomeAbout from "@/components/home/about.server";
import HomeBanner from "@/components/home/banner";
import HomeContact from "@/components/home/contact.server";
import HomeProjects from "@/components/home/project";
import HomeSkills from "@/components/home/skills.server";

export default function Home() {
  return (
    <div className={"home"}>
      <HomeBanner />
      <HomeAbout />
      <HomeProjects />
      <HomeSkills />
      <HomeContact />
    </div>
  );
}
