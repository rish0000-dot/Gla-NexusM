"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Box,
  MessageCircle,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";

const categories = [
  { label: "Books", icon: BookOpen, count: "124" },
  { label: "Cycles", icon: Box, count: "38" },
  { label: "Gadgets", icon: Sparkles, count: "76" },
  { label: "Clothes", icon: Tag, count: "52" },
];

const listings = [
  {
    title: "Data Structures in C",
    price: "₹480",
    range: "₹450–₹550",
    condition: "Good",
    seller: "Aarav M.",
    rating: "4.8",
    tone: "book",
    category: "Books",
  },
  {
    title: "Montra Downtown Cycle",
    price: "₹4,200",
    range: "₹3,800–₹4,600",
    condition: "Like new",
    seller: "Mahi S.",
    rating: "4.9",
    tone: "cycle",
    category: "Cycles",
  },
  {
    title: "Sony WH-1000XM4",
    price: "₹12,500",
    range: "₹11,800–₹13,500",
    condition: "Excellent",
    seller: "Ritvik K.",
    rating: "4.7",
    tone: "audio",
    category: "Gadgets",
  },
];

function ListingVisual({ tone }: { tone: string }) {
  if (tone === "book")
    return (
      <div className="listing-visual visual-book">
        <BookOpen size={58} strokeWidth={1.3} />
        <span>CS / 201</span>
      </div>
    );
  if (tone === "cycle")
    return (
      <div className="listing-visual visual-cycle">
        <div className="cycle-wheel cycle-wheel--a" />
        <div className="cycle-wheel cycle-wheel--b" />
        <div className="cycle-frame" />
      </div>
    );
  return (
    <div className="listing-visual visual-audio">
      <div className="headphone">
        <div />
        <div />
        <span>SONIC</span>
      </div>
    </div>
  );
}

interface CampusShelfSectionProps {
  onOpenModal: () => void;
}

export default function CampusShelfSection({ onOpenModal }: CampusShelfSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Books");

  return (
    <section className="browse-section section container" id="browse">
      <div className="browse-head">
        <div>
          <div className="section-kicker">03 / The campus shelf</div>
          <h2>
            Find your next <em>good thing.</em>
          </h2>
        </div>
        <button className="text-button hide-mobile" onClick={onOpenModal}>
          View all listings <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="category-row">
        {categories.map(({ label, icon: Icon, count }) => (
          <button
            key={label}
            className={`category-chip ${activeCategory === label ? "active" : ""}`}
            onClick={() => setActiveCategory(label)}
          >
            <Icon size={18} />
            <span>{label}</span>
            <small>{count}</small>
          </button>
        ))}
      </div>

      <div className="listing-grid">
        {listings.map((item, index) => (
          <article
            className="listing-card"
            key={item.title}
            style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
          >
            <div className="listing-top">
              <span className="condition">
                <span /> {item.condition}
              </span>
              <button className="heart-button" aria-label={`Save ${item.title}`}>
                <Bell size={16} />
              </button>
            </div>

            <ListingVisual tone={item.tone} />

            <div className="listing-info">
              <div className="listing-meta">
                <span>AI-FAIR RANGE</span>
                <span>
                  <BadgeCheck size={11} /> campus
                </span>
              </div>
              <h3>{item.title}</h3>
              <div className="listing-price">
                <strong>{item.price}</strong>
                <span>fair range {item.range}</span>
              </div>
              <div className="fair-ribbon">
                <span />
                <b>within fair range</b>
                <em>{item.range}</em>
              </div>
              <div className="seller">
                <div className="seller-avatar">{item.seller.charAt(0)}</div>
                <span>{item.seller}</span>
                <span className="seller-rating">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </span>
                <MessageCircle size={15} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
