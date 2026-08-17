import React from "react";
import { Search, MessageCircle, CircleDollarSign } from "lucide-react";

export default function StepsSection() {
  return (
    <section className="steps-section section" id="steps">
      <div className="container">
        <div className="section-kicker">04 / Keep it simple</div>
        <div className="steps-head">
          <h2>
            From “maybe”
            <br />
            to <em>“sold.”</em>
          </h2>
          <p>Everything you need to make a good exchange, without the group-chat chaos.</p>
        </div>
        <div className="steps-grid">
          <div className="step">
            <span>01</span>
            <div className="step-icon">
              <Search size={22} />
            </div>
            <h3>Discover nearby</h3>
            <p>Search by category, price, and condition. Find what you need from people on your campus.</p>
          </div>
          <div className="step step--offset">
            <span>02</span>
            <div className="step-icon">
              <MessageCircle size={22} />
            </div>
            <h3>Chat it out</h3>
            <p>Ask questions and make a plan in a private chat tied to the listing.</p>
          </div>
          <div className="step">
            <span>03</span>
            <div className="step-icon">
              <CircleDollarSign size={22} />
            </div>
            <h3>Meet. Exchange. Done.</h3>
            <p>Meet somewhere familiar, mark it sold, and leave a little trust behind.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
