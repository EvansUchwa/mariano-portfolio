import React from "react";
import { Typewriter } from "nextjs-simple-typewriter";
import { Button } from "@/uikits/buttons";

function HomeBanner() {
  return (
    <div className="home-banner flex">
      <section className="hb-left flex">
        <img src="/images/shoots/shoot.jpg" alt="Banner picture" />
      </section>
      <section className="hb-right flex f-column">
        <div>
          <h1>Mariano Gbego</h1>
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
          <p>
            Hello! I am Web Developer from United States, New York. I have rich
            experience in web site design and building, also I am good at
            wordpress.
          </p>
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
