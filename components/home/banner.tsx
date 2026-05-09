import React from "react";
import { Typewriter } from "nextjs-simple-typewriter";
import { Button } from "@/uikits/buttons";
import { Users } from "@prisma/client";

type HomeBannerProps = {
  user: Users;
};
function HomeBanner({ user }: HomeBannerProps) {
  return (
    <div className="home-banner flex">
      <section className="hb-left flex">
        <img src="/images/shoots/shoot.jpg" alt="Banner picture" />
      </section>
      <section className="hb-right flex f-column">
        <div>
          <h1>{user.fullname}</h1>
        </div>

        <section className="flex f-column">
          <h3>
            <Typewriter
              words={["Devops", "DevSecops", "Data Analyste"]}
              cursor
              cursorStyle="|"
              cursorColor="var(--primaryColor)"
              typeSpeed={250}
              deleteSpeed={80}
              delaySpeed={1000}
              loop={500000000}
            />
          </h3>
          <p>{user.jobDescription}</p>
          <div
            className="flex"
            style={{
              gap: 10,
            }}
          >
            <Button variant="outline">Mon Cv</Button>
            <Button variant="normal">En savoir plus</Button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default HomeBanner;
