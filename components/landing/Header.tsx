"use client";

import React, { useState } from "react";
import { UserRound, Plus, X } from "lucide-react";
import BrandMark from "../brand/BrandMark";

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}

export default function Header({ onOpenLogin, onOpenSignUp }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <a href="#top" className="nav-brand">
          <BrandMark />
        </a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#price-me" onClick={() => setMenuOpen(false)}>
            AI Price Me
          </a>
          <a href="#browse" onClick={() => setMenuOpen(false)}>
            Browse campus
          </a>
          <div className="auth-header-buttons">
            <button className="nav-login" onClick={() => { setMenuOpen(false); onOpenLogin(); }}>
              <UserRound size={13} /> Login
            </button>
            <button className="button button--citron signup-header-btn" onClick={() => { setMenuOpen(false); onOpenSignUp(); }}>
              Sign Up
            </button>
          </div>
        </div>
        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Plus />}
        </button>
      </nav>
    </header>
  );
}
