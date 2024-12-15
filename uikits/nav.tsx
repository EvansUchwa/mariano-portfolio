"use client";
import SiteNavigationLink from "@/components/others";
import React, { useEffect, useState } from "react";
import { LineMdMenu, LineMdMenuToCloseTransition } from "./icons";
import useMediaQuery from "@/hooks/useMediaQuery";

function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [navOnScroll, setNOS] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  useEffect(() => {
    // navOnScroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setNOS(true);
      } else {
        setNOS(false);
      }
    });
  }, []);
  return (
    <nav className={navOnScroll ? "navOnScroll" : ""}>
      <div className="nav-logo">
        <h1>GM</h1>
      </div>
      {isMobile && (
        <div
          className={"nav-hamburger flex ai-c jc-c " + (navOpen && "opened")}
          onClick={() => setNavOpen((prev) => !prev)}
        >
          {navOpen ? <LineMdMenuToCloseTransition /> : <LineMdMenu />}
        </div>
      )}

      <div
        className={
          "nav-links flex f-wrap " +
          (isMobile && (navOpen ? "onMobileOpen" : "onMobile"))
        }
      >
        <SiteNavigationLink />
      </div>

      {/* {isMobile && (
        <aside className="nav-links">
          <SiteNavigationLink />
        </aside>
      )} */}
    </nav>
  );
}

export default Navbar;
