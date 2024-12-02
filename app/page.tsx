import HomeAbout from "@/components/home/about";
import HomeBanner from "@/components/home/banner";
import HomeContact from "@/components/home/contact";
import HomeProjects from "@/components/home/project";

export default function Home() {
  return (
    <div className={"home"}>
      <HomeBanner />
      <HomeAbout />
      <HomeProjects />
      <HomeContact />
    </div>
  );
}
