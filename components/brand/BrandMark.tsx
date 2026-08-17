import React from "react";

interface BrandMarkProps {
  compact?: boolean;
}

export default function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`} aria-label="Gla~Nexus">
      <span className="brand-mark">
        <span>~</span>
      </span>
      {!compact && (
        <span className="brand-word">
          <b>Gla</b>
          <i>~</i>
          <b>Nexus</b>
        </span>
      )}
    </div>
  );
}
