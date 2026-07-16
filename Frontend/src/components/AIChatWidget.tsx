"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am Kalpanaaa AI. I have complete knowledge of our software services, product compilers, database sync systems, and leadership team. Ask me anything!"
    }
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const knowledgeBase = [
    {
      keys: ["gaurav", "tripathi", "cto", "founder", "director", "md"],
      reply: "Gaurav Kr Tripathi is the Founder, Managing Director, and CTO of Kalpanaaa Software Solutions Pvt Ltd. He leads our technical vision, full-lifecycle software visual compilers, and system architecture blueprints."
    },
    {
      keys: ["akshit", "ujjain", "ceo", "co-founder"],
      reply: "Akshit Ujjain is the Co-Founder and CEO of Kalpanaaa. He manages our strategic operations, corporate partnerships, and coordinates enterprise scaling pipelines."
    },
    {
      keys: ["rahul", "pathak", "coo", "operations", "officer"],
      reply: "Rahul Kr Pathak is the Chief Operating Officer (COO) of Kalpanaaa. He directs day-to-day strategic operations and ensures absolute service reliability and project execution velocity."
    },
    {
      keys: ["team", "leadership", "founders", "members", "who directs", "directed"],
      reply: "Kalpanaaa is directed by our core leadership group: Gaurav Kr Tripathi (Founder, MD & CTO), Akshit Ujjain (Co-Founder & CEO), and Rahul Kr Pathak (Chief Operating Officer). This squad is focused on technical excellence, strategic operations, and absolute reliability."
    },
    {
      keys: ["web", "frontend", "interface", "react", "next", "html", "css", "engineering"],
      reply: "Our Web Engineering service builds high-performance Next.js workspaces with custom component layouts, static caching, and vanilla CSS modules. We guarantee layout shifts are minimized and rendering is Apple-smooth."
    },
    {
      keys: ["mobile", "app", "ios", "android", "native"],
      reply: "We engineer native cross-platform iOS & Android mobile applications using React Native. Our mobile systems feature responsive layouts, SQLite database sync, and Cupertino-grade, Apple-smooth transitions."
    },
    {
      keys: ["devops", "cloud", "kubernetes", "docker", "aws", "automation", "server", "ci", "cd"],
      reply: "Our Cloud & DevOps Automation service scales deployments with Continuous Integration pipelines, Docker containerized architectures, and automated Kubernetes orchestration to ensure zero system downtime."
    },
    {
      keys: ["qa", "testing", "assurance", "quality", "audit", "e2e", "browser"],
      reply: "Our Enterprise Quality Assurance service provides comprehensive automated testing coverage, E2E browser validations, and continuous SQLite database integrity audits to safeguard mission-critical data."
    },
    {
      keys: ["services", "capabilities", "provide", "offer", "what do you do"],
      reply: "Kalpanaaa Software Solutions provides four core enterprise services: 1. Web Engineering (Next.js/React), 2. Omnichannel Mobile Apps (iOS/Android), 3. Cloud & DevOps Automation (Docker/Kubernetes), and 4. Enterprise Quality Assurance (E2E testing)."
    },
    {
      keys: ["products", "saas", "ecosystem", "builder", "engine", "compiler", "sync"],
      reply: "We offer three flagship products in our SaaS ecosystem: 1. Creative Interface Builder (transpiles design concepts to Next.js), 2. AI Code Engine (resolves compile errors), and 3. Mockup Sync API (links visual workspaces to SQLite databases)."
    },
    {
      keys: ["sync", "mockup", "database", "sqlite", "postgres", "django", "rest", "api"],
      reply: "Our Mockup Sync API maps visual editor inputs directly to local database tables (SQLite and PostgreSQL) using Django REST framework endpoints, maintaining 100% data sync consistency."
    },
    {
      keys: ["government", "public", "regulatory", "secure", "compliant"],
      reply: "For the Government sector, we provide SEC-compliant, stable, and highly secure database synchronization frameworks that implement user permission controls and access logging with zero down time."
    },
    {
      keys: ["healthcare", "medical", "hipaa", "clinic", "patient"],
      reply: "For Healthcare, we build HIPAA-compliant record management pipelines that securely connect medical databases with front-end clinical workspaces using encrypted APIs."
    },
    {
      keys: ["finance", "banking", "ledger", "transaction", "pci", "dss"],
      reply: "For Finance, we deploy PCI-DSS compliant transaction handlers, low-latency SQLite ledger audits, and automated stress testing dashboards protecting critical financial assets."
    },
    {
      keys: ["education", "school", "university", "learning", "portal"],
      reply: "For Education, we engineer high-traffic learning portals, student database servers, and responsive multi-device online testing workspaces for schools and virtual universities."
    },
    {
      keys: ["industries", "segments", "government", "healthcare", "finance", "education"],
      reply: "We deliver custom visual workspaces and database sync pipelines tailored to major industry segments including Government, Healthcare, Financial Tech, and Educational Tech."
    },
    {
      keys: ["contact", "email", "address", "inquiry", "hello", "write", "reach", "talk", "phone", "number", "call", "tel"],
      reply: "You can reach our senior software architects directly by emailing hello@kalpanaaa.com or calling +91 7439067376. Feel free to submit a consult request on our Contact page!"
    },
    {
      keys: ["hello", "hi", "hey", "greetings"],
      reply: "Hello! I am Kalpanaaa AI. How can I assist you with our software engineering services, leadership specs, or database sync products today?"
    }
  ];

  const fallbacks = [
    "That is an excellent point! At Kalpanaaa Software Solutions, we address that using our custom web, mobile, and sync API blueprints. Let's arrange a technical consultation to integrate this specification into your workspace. Send us a message at hello@kalpanaaa.com!",
    "Our engineering squad, directed by CTO Gaurav Kr Tripathi, CEO Akshit Ujjain, and COO Rahul Kr Pathak, specialises in automating complex software pipelines. We build strictly typed TypeScript Next.js frontends and resilient Django REST backends to satisfy these specifications. Let's talk at hello@kalpanaaa.com!",
    "We provide complete web engineering, containerized Docker deployments, and automated SQLite sync databases. Let us know how we can tailor our SaaS mockup sync engines to support your system architecture. Get in touch with our team at hello@kalpanaaa.com!"
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input.toLowerCase();
    setInput("");
    setTyping(true);

    setTimeout(() => {
      let reply = "";

      // Smart fuzzy matching across keys
      for (const item of knowledgeBase) {
        const match = item.keys.some((key) => query.includes(key));
        if (match) {
          reply = item.reply;
          break;
        }
      }

      // No matches fallback: select a strong proactive response instead of saying sorry
      if (!reply) {
        const idx = Math.floor(Math.random() * fallbacks.length);
        reply = fallbacks[idx];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: reply
        }
      ]);
      setTyping(false);
    }, 800);
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, fontFamily: "var(--font-inter)", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      {/* Floating Action Button (FAB) with Apple scale-rotate transition */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          color: "#fff",
          border: "none",
          outline: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(79, 70, 229, 0.3)",
          transform: isOpen ? "scale(0) rotate(90deg)" : "scale(1) rotate(0deg)",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "absolute",
          bottom: 0,
          right: 0
        }}
        title="Ask Kalpanaaa AI"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>

      {/* Expanded Cupertino Chat Window with persistent DOM mounting & hardware-accelerated transforms */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "calc(100vw - 48px)",
        maxWidth: "360px",
        height: "480px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(30px) saturate(190%)",
        WebkitBackdropFilter: "blur(30px) saturate(190%)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
        transformOrigin: "bottom right",
        transform: isOpen ? "scale(1) translate3d(0, 0, 0)" : "scale(0.8) translate3d(20px, 20px, 0)",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        pointerEvents: isOpen ? "auto" : "none",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "rgba(0, 0, 0, 0.02)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>Kalpanaaa AI</h4>
              <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>System Expert</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: "transparent", border: "none", color: "var(--color-text-muted)", cursor: "pointer", fontSize: "16px", padding: "4px" }}
          >
            ✕
          </button>
        </div>

        {/* Messages Stream */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg) => {
            const isAI = msg.sender === "ai";
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isAI ? "flex-start" : "flex-end",
                  maxWidth: "80%",
                  background: isAI ? "rgba(0, 0, 0, 0.03)" : "var(--color-primary)",
                  color: isAI ? "var(--color-text-primary)" : "#fff",
                  padding: "10px 14px",
                  borderRadius: isAI ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  border: isAI ? "1px solid rgba(0,0,0,0.04)" : "none"
                }}
              >
                {msg.text}
              </div>
            );
          })}
          
          {/* Typing bubble */}
          {typing && (
            <div style={{
              alignSelf: "flex-start",
              background: "rgba(0, 0, 0, 0.03)",
              padding: "10px 14px",
              borderRadius: "16px 16px 16px 4px",
              fontSize: "13px",
              color: "var(--color-text-muted)"
            }}>
              Typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input Area with Paper Rocket Button */}
        <form onSubmit={handleSend} style={{
          padding: "12px 16px",
          background: "rgba(0, 0, 0, 0.01)",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}>
          <input
            type="text"
            placeholder="Ask about team, stack, or services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#fff",
              outline: "none",
              fontSize: "13px",
              height: "38px"
            }}
          />
          <button
            type="submit"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.15s ease",
              flexShrink: 0
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            title="Send Message"
          >
            {/* SVG Paper Rocket Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
