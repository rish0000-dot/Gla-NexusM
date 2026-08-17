"use client";

import React from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";

interface FinalCtaSectionProps {
  onOpenModal: () => void;
}

export default function FinalCtaSection({ onOpenModal }: FinalCtaSectionProps) {
  return (
    <section className="final-cta section container">
      <div className="cta-orbit cta-orbit--left">
        fair
        <br />
        <span>exchange</span>
      </div>
      <div className="cta-inner">
        <div className="cta-mark">~</div>
        <div className="section-kicker">05 / Your campus, connected</div>
        <h2>
          Make room for
          <br />
          <em>what’s next.</em>
        </h2>
        <p>Join the campus marketplace built around better finds, fairer prices, and people you can actually reach.</p>
        <button className="button button--citron" onClick={onOpenModal}>
          Get early access <ArrowUpRight size={17} />
        </button>
        <span className="cta-note">
          <Clock3 size={13} /> Launching soon on your campus
        </span>
      </div>
      <div className="cta-orbit cta-orbit--right">
        <span>~</span>
        <br />
        same campus
      </div>
    </section>
  );
}
