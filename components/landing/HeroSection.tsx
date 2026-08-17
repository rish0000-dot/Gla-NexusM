"use client";

import React from "react";
import { ArrowUpRight, ChevronRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero container" id="top">
      <div className="hero-copy reveal reveal--1">
        <div className="eyebrow">
          <span className="pulse-dot" /> Built for your campus <span className="eyebrow-line" />
        </div>
        <h1>
          Good stuff.
          <br />
          <em>Fair prices.</em>
          <br />
          Same campus.
        </h1>
        <p className="hero-lede">
          The smarter way to buy and sell second-hand essentials with people you already have something in common with.
        </p>
        <div className="hero-actions">
          <button className="button button--ink" onClick={() => scrollTo("browse")}>
            Explore the marketplace <ArrowUpRight size={17} />
          </button>
          <button className="text-button" onClick={() => scrollTo("how-it-works")}>
            See how it works <ChevronRight size={16} />
          </button>
        </div>
        <div className="trust-line">
          <BadgeCheck size={16} /> College-email verified <span /> <ShieldCheck size={16} /> Chat in-app, meet on campus
        </div>
      </div>

      <div className="hero-art reveal reveal--2">
        <div className="hero-image-wrap">
          <img src="/images/gla-nexus-hero.jpg" alt="Curated collection of useful campus items" />
        </div>
        <div className="floating-price glass-card">
          <div className="mini-label">
            <Sparkles size={13} /> AI PRICE ME
          </div>
          <div className="price-number">
            ₹450 <span>— ₹550</span>
          </div>
          <div className="price-reason">Based on 8 months of use + good condition</div>
          <div className="price-bar">
            <i />
            <i />
            <i />
            <i />
            <i />
            <b />
          </div>
        </div>
        <div className="floating-note glass-card">
          <div className="verified-dot">
            <BadgeCheck size={14} />
          </div>
          <div>
            <strong>Campus verified</strong>
            <small>Only students from your college</small>
          </div>
        </div>
        <div className="art-scribble">
          trade
          <br />
          <span>better</span>
        </div>
      </div>
    </section>
  );
}
