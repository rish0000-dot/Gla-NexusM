"use client";

import React, { useState } from "react";
import { UserRound, LogOut, Plus, X } from "lucide-react";
import BrandMark from "../brand/BrandMark";
import { UserProfile } from "./AuthModal";

interface HeaderProps {
  user: UserProfile | null;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onLogout: () => void;
}

export default function Header({ user, onOpenLogin, onOpenSignUp, onLogout }: HeaderProps) {
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
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                  Hi, {user.name.split(" ")[0]} ({user.branch})
                </span>
                <button 
                  className="nav-login"
                  onClick={() => { setMenuOpen(false); onLogout(); }}
                  style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <>
                <button className="nav-login" onClick={() => { setMenuOpen(false); onOpenLogin(); }}>
                  <UserRound size={13} /> Login
                </button>
                <button className="button button--citron signup-header-btn" onClick={() => { setMenuOpen(false); onOpenSignUp(); }}>
                  Sign Up
                </button>
              </>
            )}
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
