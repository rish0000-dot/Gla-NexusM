"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface AiPricingSectionProps {
  onOpenModal: () => void;
}

export default function AiPricingSection({ onOpenModal }: AiPricingSectionProps) {
  return (
    <section className="price-section section" id="price-me">
      <div className="container price-grid">
        <div className="price-visual reveal">
          <img src="/images/gla-nexus-ai-pricing.jpg" alt="AI-assisted pricing concept with a fair range" />
          <div className="price-stamp">
            <Sparkles size={17} />
            <span>
              Fair
              <br />
              by design
            </span>
          </div>
        </div>
        <div className="price-copy">
          <div className="section-kicker">02 / Meet AI Price Me</div>
          <h2>
            Stop guessing.
            <br />
            <em>Start pricing fair.</em>
          </h2>
          <p>
            Tell us what you’re selling, how old it is, and what shape it’s in. Gla~Nexus gives you a realistic price range with the reasoning behind it—so buyers know it’s fair, too.
          </p>
          <div className="range-demo glass-card">
            <div className="range-top">
              <span>Suggested range</span>
              <strong>₹450 — ₹550</strong>
            </div>
            <div className="range-track">
              <span />
              <b />
            </div>
            <div className="range-meta">
              <span>
                Lower <small>₹450</small>
              </span>
              <span>
                Likely <small>₹510</small>
              </span>
              <span>
                Upper <small>₹550</small>
              </span>
            </div>
          </div>
          <button className="button button--ink" onClick={onOpenModal}>
            Try a smarter listing <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
