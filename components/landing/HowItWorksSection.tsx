"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function HowItWorksSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="intro section container" id="how-it-works">
      <div className="section-kicker">01 / A better campus loop</div>
      <div className="intro-grid">
        <h2>
          Your campus has a<br />
          <em>second life</em> for everything.
        </h2>
        <div>
          <p>
            That textbook you’re done with. The cycle gathering dust. The headphones you’ve outgrown. Gla~Nexus makes it easy to pass useful things on—and find your next useful thing close by.
          </p>
          <button className="text-button" onClick={() => scrollTo("browse")}>
            Find something useful <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="intro-signal">
        <span>01</span>
        <div className="signal-line" />
        <span>03</span>
      </div>
    </section>
  );
}
