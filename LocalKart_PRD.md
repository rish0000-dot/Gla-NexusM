# Product Requirements Document (PRD)
## LocalKart — Hyperlocal College Marketplace

| | |
|---|---|
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | [Your Name] |
| **Last Updated** | August 2026 |

---

## 1. Executive Summary

LocalKart is a hyperlocal, campus-only marketplace where students can buy and sell second-hand items — books, cycles, gadgets, clothes, and more — directly with other students on the same campus. The core differentiator is an **AI Price Me** feature powered by Gemini, which gives sellers an instant, fair price suggestion based on item age and condition, removing the guesswork and haggling friction that plagues platforms like OLX or Facebook Marketplace.

**One-liner:** *"OLX for your campus, with an AI that tells you what your stuff is actually worth."*

---

## 2. Problem Statement

Every semester, students accumulate items they no longer need — old textbooks, cycles, calculators, hostel furniture, gadgets — and every new semester, other students need exactly those items cheap and fast.

Current options are broken for this use case:

| Existing Option | Why It Fails |
|---|---|
| WhatsApp/Telegram groups | Unstructured, no search, no price benchmark, items get buried in chat |
| OLX / Facebook Marketplace | Not campus-restricted — safety concerns, meetups far away, irrelevant listings, no student trust layer |
| Physical notice boards | Slow, no reach, no images, outdated instantly |
| Word of mouth | Limited reach, unfair pricing (either senior overcharges or junior underprices out of desperation) |

**Core pain points:**
1. Sellers don't know what a fair price is → either overprice (no sale) or underprice (lose money).
2. No trust — buying from a stranger off-campus feels risky.
3. No centralized, searchable, campus-specific place to list/discover items.
4. No easy way to negotiate/communicate in-app.

---

## 3. Goals & Objectives

### 3.1 Product Goals
- Become the default first stop for any student wanting to buy/sell used items on campus.
- Remove pricing friction using AI-assisted valuation.
- Build trust through campus-verified users and a review system.

### 3.2 Success Metrics (KPIs)

| Metric | Target (first semester) |
|---|---|
| Registered users | 30–40% of campus student body |
| Listings created | 500+ in first 2 months |
| "AI Price Me" usage rate | >70% of new listings |
| Successful transactions (marked "sold") | 200+ in first semester |
| Avg. time-to-sale | < 7 days |
| Repeat sellers (list again within semester) | > 40% |
| Avg. seller rating | > 4.2 / 5 |

---

## 4. Target Users & Personas

### Persona 1: "Seller Simran" — Final year student
- Has old semester books, a cycle, a calculator she no longer needs.
- Wants to sell fast, doesn't want to haggle over WhatsApp with 10 people.
- **Need:** Quick listing, fair price suggestion, minimal back-and-forth.

### Persona 2: "Buyer Rohan" — First year student
- New to campus, budget-conscious, needs a cycle and DS textbook urgently.
- Doesn't know market rates, worried about getting overcharged as a "fresher."
- **Need:** Trustworthy price reference, easy filtering by category/budget, quick chat with seller.

### Persona 3: "Casual Browser Aditi"
- Not actively buying/selling but checks the app for good deals occasionally.
- **Need:** Good discovery/browse experience, notifications for relevant categories.

---

## 5. Scope

### 5.1 In Scope (MVP)
- User auth (college email verification)
- Create/edit/delete listings with images
- AI Price Me (Gemini-based valuation)
- Category browsing + filters + search
- In-app 1:1 messaging per listing
- Mark item as "Sold" toggle
- Post-transaction review/rating system
- Basic user profile (listings, ratings, sold history)

### 5.2 Out of Scope (MVP) — Future Roadmap
- Payments/escrow integration (cash-on-meetup only for v1)
- Delivery/courier integration
- Multi-campus expansion (single college pilot first)
- Auction/bidding system
- Push notifications (email notifications only in v1)
- Admin analytics dashboard (basic moderation only)

---

## 6. Feature Requirements (Detailed)

### 6.1 Authentication & Onboarding
- Sign up/login via **college email only** (e.g., `@college.edu.in`) → ensures campus exclusivity and trust.
- OTP/email verification link.
- Profile setup: name, branch, year, hostel/day-scholar, profile photo.

**User Story:** *As a student, I want to sign up with my college email so that I know everyone on the platform is actually from my campus.*

### 6.2 Create Listing
- Fields: Title, Category (Books/Cycles/Gadgets/Clothes/Furniture/Other), Description, Purchase year, Condition (New/Like New/Good/Fair/Poor), Original price (optional), Images (up to 5, via Cloudinary).
- **"AI Price Me" button:**
  - Seller inputs: category, item age, condition, original price (if known), brief description.
  - Gemini API call returns: suggested price range (min–max), one-line reasoning (e.g., "Priced considering 2-year usage and moderate wear typical for engineering textbooks").
  - Seller can accept suggested price or override manually.

**User Story:** *As a seller, I want an instant fair price suggestion so I don't have to research or guess what to charge.*

### 6.3 Browse & Discovery
- Home feed: recent listings, campus-wide.
- Category filter tabs (Books, Cycles, Gadgets, Clothes, Other).
- Search bar (title/description keyword search).
- Sort by: Price (low-high/high-low), Newest, Condition.
- Listing card shows: image, title, price, condition badge, seller rating.

### 6.4 Listing Detail Page
- Full image gallery, description, AI-suggested price vs listed price (transparency badge: "Priced fairly by AI" if within AI range).
- Seller info: name, year/branch, rating, response rate.
- "Message Seller" CTA.

### 6.5 In-App Messaging
- 1:1 chat thread tied to a specific listing.
- Real-time or near-real-time (Socket.io recommended over Express polling).
- Basic message list + unread indicators.

### 6.6 Sold Toggle & Transaction Closure
- Seller marks listing as "Sold" (with optional: sold to whom, via dropdown of chat contacts).
- Sold listings move to a separate "Sold" tab, greyed out in browse (not deleted — useful for price history/trust).

### 6.7 Review & Rating System
- After marking sold, both buyer and seller can rate each other (1–5 stars + optional comment).
- Ratings aggregate on user profile.
- Prevents fake/no-show transactions from going unpenalized (light trust signal).

### 6.8 User Profile
- My Listings (Active/Sold)
- My Purchases (items bought)
- Ratings received
- Edit profile

---

## 7. Technical Architecture

### 7.1 Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose ODM) |
| AI Pricing | Google Gemini API |
| Image Storage | Cloudinary |
| Real-time chat | Socket.io (recommended addition) |
| Auth | JWT + Email OTP (Nodemailer) |
| Hosting | Frontend: Vercel/Netlify · Backend: Render/Railway · DB: MongoDB Atlas |

### 7.2 High-Level System Flow
1. User logs in → JWT issued → stored client-side.
2. Seller creates listing → images uploaded to Cloudinary → URLs saved in MongoDB.
3. Seller clicks "AI Price Me" → frontend sends item metadata to backend → backend calls Gemini API with a structured prompt → parsed price range returned to frontend.
4. Listing saved with `aiSuggestedPrice` and `listedPrice` fields.
5. Buyer browses/searches → filtered query hits MongoDB → results rendered.
6. Buyer messages seller → Socket.io channel scoped to `listingId` + `userIds`.
7. Deal closes offline → seller toggles "Sold" → both parties prompted to review.

### 7.3 Data Model (Core Collections)

**User**
```
{
  _id, name, collegeEmail, passwordHash,
  branch, year, hostelOrDayScholar,
  profileImage, avgRating, totalRatings,
  createdAt
}
```

**Listing**
```
{
  _id, sellerId, title, description, category,
  condition, itemAgeMonths, originalPrice,
  aiSuggestedPriceMin, aiSuggestedPriceMax, aiReasoning,
  listedPrice, images[], status: "active" | "sold",
  soldToUserId, createdAt, updatedAt
}
```

**Message**
```
{
  _id, listingId, senderId, receiverId,
  text, createdAt, readAt
}
```

**Review**
```
{
  _id, transactionListingId, fromUserId, toUserId,
  rating, comment, createdAt
}
```

### 7.4 Key API Endpoints (sample)

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | College email signup |
| POST | `/api/auth/verify-otp` | Email OTP verification |
| POST | `/api/auth/login` | Login |
| POST | `/api/listings` | Create listing |
| POST | `/api/listings/ai-price` | Get Gemini price suggestion |
| GET | `/api/listings?category=&search=&sort=` | Browse/filter listings |
| GET | `/api/listings/:id` | Listing detail |
| PATCH | `/api/listings/:id/sold` | Mark as sold |
| GET/POST | `/api/messages/:listingId` | Chat thread |
| POST | `/api/reviews` | Submit review |
| GET | `/api/users/:id` | Public profile |

### 7.5 Gemini "AI Price Me" — Prompt Design (sample)
```
System: You are a fair-pricing assistant for a college marketplace.
Given item category, age, condition, and original price (if any),
return a JSON object with: minPrice, maxPrice, reasoning (1 line).
Be realistic for a student resale context in India.

Input: { category: "Books", itemAgeMonths: 8, condition: "Good",
         originalPrice: 650, title: "Data Structures - Cormen" }
```
Output parsed and validated before saving — always show reasoning to build seller trust in the number.

---

## 8. Non-Functional Requirements

- **Performance:** Listing feed should load < 2s for first 20 items (pagination/infinite scroll).
- **Security:** JWT auth, college-email domain restriction, input sanitization, image upload size/type limits.
- **Scalability:** MVP for single campus (~5-10k students); design DB indexes on `category`, `status`, `createdAt` for scale.
- **Reliability:** Gemini API failures should gracefully fallback ("AI pricing unavailable, enter manually") — never block listing creation.
- **Privacy:** Phone numbers not shown publicly; all contact via in-app chat only.

---

## 9. User Flow Summary

```
Signup (college email) → Verify → Home Feed
        │
        ├── SELL: Create Listing → Add Details → [AI Price Me] → Publish
        │
        └── BUY: Browse/Search/Filter → View Listing → Message Seller
                                                              │
                                                    Deal Made Offline
                                                              │
                                                    Seller: Mark Sold
                                                              │
                                                    Both: Leave Review
```

---

## 10. Milestones / Suggested Build Roadmap

| Phase | Scope | Est. Time |
|---|---|---|
| Phase 1 | Auth + basic listing CRUD + image upload | 1 week |
| Phase 2 | Gemini AI Price Me integration | 3-4 days |
| Phase 3 | Browse, search, filters | 3-4 days |
| Phase 4 | In-app messaging (Socket.io) | 4-5 days |
| Phase 5 | Sold toggle + review system | 3 days |
| Phase 6 | Polish UI, testing, deploy | 4-5 days |

*(Good scope for a hackathon/college major project — roughly 3-4 weeks solo, less with a team.)*

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Gemini gives unrealistic prices for niche items | Show as a *range with reasoning*, always editable by seller |
| Low initial adoption (chicken-egg problem) | Seed with your own department's book/cycle listings; partner with hostel WhatsApp groups for launch |
| Fake accounts / spam listings | College email verification + report/flag feature |
| No-show after "sold" | Rating system creates social accountability |
| Image storage costs | Cloudinary free tier sufficient for MVP scale |

---

## 12. Why This Wins (Pitch Angle)

- **Familiar model, sharper niche:** Everyone understands OLX/Marketplace — this is that, but trustworthy because it's campus-only.
- **Real technical depth:** Not just CRUD — Gemini-based valuation + image pipeline + real-time chat shows full-stack + AI integration skill, great for a project demo/evaluation.
- **Immediate, provable demand:** Every semester-end, students actively search for exactly this. Easy to demo with real data from your own campus.

---

*End of PRD*
