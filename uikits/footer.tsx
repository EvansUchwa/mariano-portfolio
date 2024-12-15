import React from "react";
import { PhEnvelope, PhLinkedinLogo } from "./icons";
import SiteNavigationLink from "@/components/others";

function Footer() {
  return (
    <footer className="flex f-column">
      <section className="footerSocials flex">
        <a href="" target="_blank">
          <PhLinkedinLogo />
        </a>
        <a href="">
          <PhEnvelope />
        </a>
      </section>
      <section className="footerFastLinks flex f-wrap">
        <SiteNavigationLink />
      </section>
      <section className="footerBottom">
        <p>
          Fait avec soins par <a href="evansdjossouvi.com">Evans Djossouvi</a>{" "}
        </p>
      </section>
    </footer>
  );
}

export default Footer;
