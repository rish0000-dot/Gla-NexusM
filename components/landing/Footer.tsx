import React from "react";
import BrandMark from "../brand/BrandMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <BrandMark />
        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#price-me">AI Price Me</a>
          <a href="#browse">Browse</a>
          <a href="mailto:hello@gla-nexus.com">Say hello</a>
        </div>
        <span className="footer-copy">© 2026 Gla~Nexus / Built for better campus loops.</span>
      </div>
    </footer>
  );
}
