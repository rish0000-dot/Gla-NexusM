"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import Ticker from "@/components/landing/Ticker";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AiPricingSection from "@/components/landing/AiPricingSection";
import CampusShelfSection from "@/components/landing/CampusShelfSection";
import StepsSection from "@/components/landing/StepsSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import Footer from "@/components/landing/Footer";
import AuthModal, { UserProfile } from "@/components/landing/AuthModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<UserProfile | null>(null);

  // Check existing session on load
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok && data.authenticated && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    }
    checkSession();
  }, []);

  const handleOpenLogin = () => {
    setModalMode("login");
    setModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setModalMode("signup");
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      
      {/* Header Navigation */}
      <Header 
        user={user}
        onOpenLogin={handleOpenLogin} 
        onOpenSignUp={handleOpenSignUp} 
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Ticker Marquee */}
      <Ticker />

      {/* Section 01: How It Works */}
      <HowItWorksSection />

      {/* Section 02: AI Price Me */}
      <AiPricingSection onOpenModal={handleOpenSignUp} />

      {/* Section 03: Campus Shelf Marketplace */}
      <CampusShelfSection onOpenModal={handleOpenSignUp} />

      {/* Section 04: 3-Step Guide */}
      <StepsSection />

      {/* Section 05: Final CTA */}
      <FinalCtaSection onOpenModal={handleOpenSignUp} />

      {/* Footer */}
      <Footer />

      {/* Sign-in / Access Modal */}
      <AuthModal 
        isOpen={modalOpen} 
        initialMode={modalMode} 
        onClose={handleCloseModal}
        onAuthSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </main>
  );
}
