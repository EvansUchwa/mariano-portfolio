"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [navOnScroll, setNOS] = useState<boolean>(false);
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
      <div className="nav-links">
        {[0, 0, 0, 0, 0].map((item, i) => (
          <Link key={"nav link nb" + i} href={"/"}>
            Lien
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
