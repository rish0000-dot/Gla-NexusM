"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, X, Eye, EyeOff, User, Mail, Lock, BookOpen, GraduationCap, Calendar, AlertCircle } from "lucide-react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  domain: string;
  branch: string;
  year: string;
}

interface AuthModalProps {
  isOpen: boolean;
  initialMode: "login" | "signup";
  onClose: () => void;
  onAuthSuccess?: (user: UserProfile) => void;
}

const domainData: Record<string, string[]> = {
  "B.Tech": [
    "Computer Science & Engineering (CSE)",
    "Electronics & Communication Engineering (ECE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Electrical Engineering (EE)",
    "Biotechnology (BT)"
  ],
  "M.Tech": [
    "Computer Science & Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Electrical Engineering"
  ],
  "BCA": [
    "General Computer Applications",
    "Data Science"
  ],
  "MCA": [
    "General MCA",
    "Data Science & AI",
    "Cloud Computing"
  ],
  "BBA": [
    "General Business Administration",
    "Family Business",
    "Banking & Finance"
  ],
  "MBA": [
    "Business Analytics",
    "Financial Markets & Banking",
    "Logistics & Supply Chain Management",
    "Marketing & HR"
  ],
  "B.Sc (Hons)": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Agriculture"
  ],
  "M.Sc": [
    "Biotechnology",
    "Microbiology & Immunology",
    "Chemistry",
    "Mathematics",
    "Physics"
  ],
  "B.Pharm": [
    "Pharmaceutical Sciences"
  ],
  "Diploma Engg": [
    "CSE",
    "ECE",
    "ME",
    "CE",
    "EE"
  ]
};

export default function AuthModal({ isOpen, initialMode, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Domain, Branch & Year fields (Sign Up only)
  const [domain, setDomain] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  
  // Validation errors
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    domain?: string;
    branch?: string;
    year?: string;
    general?: string;
    isAlreadyRegistered?: boolean;
    needsRegistration?: boolean;
  }>({});
  
  // Success state
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync mode with initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setSuccessMsg("");
      setShowPassword(false);
      setLoading(false);
    }
  }, [isOpen, initialMode]);

  // Update branches when domain changes
  useEffect(() => {
    if (domain && domainData[domain]) {
      setAvailableBranches(domainData[domain]);
      setBranch("");
    } else {
      setAvailableBranches([]);
      setBranch("");
    }
  }, [domain]);

  // Update years dynamically based on Domain duration
  useEffect(() => {
    if (domain) {
      let duration = 3;
      if (["B.Tech", "B.Pharm"].includes(domain)) {
        duration = 4;
      } else if (["M.Tech", "MCA", "MBA", "M.Sc"].includes(domain)) {
        duration = 2;
      }
      
      const years = [];
      for (let i = 1; i <= duration; i++) {
        if (i === 1) years.push("1st Year");
        else if (i === 2) years.push("2nd Year");
        else if (i === 3) years.push("3rd Year");
        else if (i === 4) years.push("4th Year");
      }
      setAvailableYears(years);
      setYear("");
    } else {
      setAvailableYears([]);
      setYear("");
    }
  }, [domain]);

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors: typeof errors = {};
    
    if (mode === "signup") {
      if (!name.trim()) {
        tempErrors.name = "Full name is required";
      }
      if (!domain) {
        tempErrors.domain = "Program/Domain is required";
      }
      if (!branch) {
        tempErrors.branch = "Branch is required";
      }
      if (!year) {
        tempErrors.year = "Academic year is required";
      }
    }

    if (!email.trim()) {
      tempErrors.email = "GLA Email address is required";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gla\.ac\.in$/;
      if (!emailPattern.test(email.toLowerCase().trim())) {
        tempErrors.email = "Must be a valid GLA email ending with @gla.ac.in";
      }
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    } else if (mode === "signup" && !/^(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      tempErrors.password = "Password must contain both letters and numbers";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login";
      const payload = mode === "signup"
        ? { name, email, password, domain, branch, year }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          general: data.error || "Authentication failed. Please try again.",
          isAlreadyRegistered: data.isAlreadyRegistered || false,
          needsRegistration: data.needsRegistration || false,
        });
      } else {
        setSuccessMsg(
          mode === "signup"
            ? `Account registered successfully! Welcome to Gla~Nexus, ${data.user?.name || name}.`
            : `Logged in successfully! Welcome back, ${data.user?.name || "Student"}.`
        );
        
        if (data.user && onAuthSuccess) {
          onAuthSuccess(data.user);
        }

        setTimeout(() => {
          setSuccessMsg("");
          onClose();
        }, 1500);
      }
    } catch {
      setErrors({ general: "Network error or database server unreachable. Check connection settings." });
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode("login");
    setErrors({});
  };

  const switchToSignUp = () => {
    setMode("signup");
    setErrors({});
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`access-modal auth-modal-box ${mode === "signup" ? "auth-modal-box--wide" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Auth Tabs */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
            onClick={switchToLogin}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
            onClick={switchToSignUp}
          >
            Sign Up
          </button>
        </div>

        <h2>
          {mode === "login" ? "Welcome back." : "Join the loop."}
        </h2>
        <p>
          {mode === "login" 
            ? "Sign in to buy and sell second-hand essentials." 
            : "Register with your verified GLA university email (@gla.ac.in)."}
        </p>

        {/* Error Banner */}
        {errors.general && (
          <div className="auth-error-box" style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            color: "#ef4444",
            fontSize: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errors.general}</span>
            </div>
            
            {/* Quick Action Button for duplicate email conflict */}
            {errors.isAlreadyRegistered && (
              <button
                type="button"
                onClick={switchToLogin}
                style={{
                  alignSelf: "flex-start",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "4px"
                }}
              >
                Switch to Login Mode →
              </button>
            )}

            {/* Quick Action Button if login email not registered */}
            {errors.needsRegistration && (
              <button
                type="button"
                onClick={switchToSignUp}
                style={{
                  alignSelf: "flex-start",
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "4px"
                }}
              >
                Switch to Sign Up Mode →
              </button>
            )}
          </div>
        )}

        {successMsg ? (
          <div className="auth-success-box">
            <span>✓</span>
            <p>{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {mode === "signup" ? (
              <div className="signup-form-grid">
                {/* Left Column */}
                <div className="signup-form-col">
                  <div className="form-group">
                    <label htmlFor="name-input">Full Name</label>
                    <div className="input-icon-wrapper">
                      <User className="input-icon" size={16} />
                      <input
                        id="name-input"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email-input">GLA University Email</label>
                    <div className="input-icon-wrapper">
                      <Mail className="input-icon" size={16} />
                      <input
                        id="email-input"
                        type="email"
                        placeholder="yourname@gla.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                        required
                      />
                    </div>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password-input">Password (Min 6 chars, letters & numbers)</label>
                    <div className="input-icon-wrapper">
                      <Lock className="input-icon" size={16} />
                      <input
                        id="password-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="e.g. Gla1234"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="signup-form-col">
                  <div className="form-group">
                    <label htmlFor="domain-select">Program / Domain</label>
                    <div className="input-icon-wrapper input-select-wrapper">
                      <GraduationCap className="input-icon" size={16} />
                      <select
                        id="domain-select"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                      >
                        <option value="">Select Domain</option>
                        {Object.keys(domainData).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    {errors.domain && <span className="error-text">{errors.domain}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="branch-select">Branch / Specialization</label>
                    <div className="input-icon-wrapper input-select-wrapper">
                      <BookOpen className="input-icon" size={16} />
                      <select
                        id="branch-select"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        disabled={!domain}
                        required
                      >
                        <option value="">Select Branch</option>
                        {availableBranches.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    {errors.branch && <span className="error-text">{errors.branch}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="year-select">Academic Year</label>
                    <div className="input-icon-wrapper input-select-wrapper">
                      <Calendar className="input-icon" size={16} />
                      <select
                        id="year-select"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        disabled={!domain}
                        required
                      >
                        <option value="">Select Year</option>
                        {availableYears.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    {errors.year && <span className="error-text">{errors.year}</span>}
                  </div>
                </div>
              </div>
            ) : (
              // Login Mode
              <div className="login-form-wrapper">
                <div className="form-group">
                  <label htmlFor="email-input">GLA University Email</label>
                  <div className="input-icon-wrapper">
                    <Mail className="input-icon" size={16} />
                    <input
                      id="email-input"
                      type="email"
                      placeholder="yourname@gla.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                      required
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group" style={{ marginTop: "16px" }}>
                  <label htmlFor="password-input">Password</label>
                  <div className="input-icon-wrapper">
                    <Lock className="input-icon" size={16} />
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
              </div>
            )}

            <button type="submit" className="button button--ink modal-submit" disabled={loading}>
              {loading ? "Processing..." : mode === "login" ? "Login" : "Register"} <ArrowUpRight size={17} />
            </button>
          </form>
        )}

        <small className="auth-footer-note">
          Only verified GLA University students and faculty can access the marketplace.
        </small>
      </div>
    </div>
  );
}
