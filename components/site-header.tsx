"use client";

import Link from "next/link";
import { useState } from "react";

import { portfolioData } from "@/data/portfolio";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container navigation">
        <Link className="logo" href="/#top" aria-label="전희준 포트폴리오 홈" onClick={closeMenu}>
          HJ<span>.</span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
          Menu
        </button>
        <nav
          id="primary-navigation"
          className={`navigation-links${isMenuOpen ? " is-open" : ""}`}
          aria-label="주요 메뉴"
        >
          {portfolioData.navigation.map(({ label, href }) => (
            <Link key={href} href={`/${href}`} onClick={closeMenu}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
