"use client";

import { useState, use, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "../../page.module.css";
import { API_BASE_URL } from "../../../config/api";

type CompanyData = {
  title: string;
  sub: string;
  desc: string;
  features: string[];
};

const companyData: Record<string, CompanyData> = {
  "about-us": {
    title: "About Our Company",
    sub: "IT automation and software engineering solutions for complex challenges.",
    desc: "A collective of senior software engineers, system architects, and database experts focused on solving complex workflow bottlenecks. We deliver enterprise-grade engineering blueprints that help companies scale confidently.",
    features: [
      "Founded on clean-code visual design guidelines",
      "Senior engineer assignment on all consultant products",
      "Direct integration pipelines with customer repositories"
    ]
  },
  "career": {
    title: "Careers at Kalpanaaaa",
    sub: "Join a fast-moving, high-impact remote engineering squad.",
    desc: "We are always hunting for senior engineering talents, DevOps automators, and visual interface architects who appreciate detail and micro-interactive styling. Work with scaling brands globally.",
    features: [
      "100% remote-first operational structures",
      "Flexible schedule with focus on engineering quality",
      "Annual growth stipends and visual tech stack allowances"
    ]
  },
  "testimonials": {
    title: "Client Testimonials & Trust",
    sub: "Hear what scaling enterprises and medium-level startups say.",
    desc: "Discover how medium-scale and scaling startups partner with us to automate operations and syncing. We make UI mocks transition into real database mockups instantly.",
    features: [
      "98% customer satisfaction and project success rate",
      "Average frontend development velocity increased by 2.4x",
      "Trusted database and SQLite sync stability index"
    ]
  },
  "contact": {
    title: "Contact Our Consultants",
    sub: "Talk to our senior software architects today.",
    desc: "Let us help you design, engineer, and automate your company processes. Reach out to schedule a technical architecture session or check mockup sync API specifications.",
    features: [
      "Custom system architecture blueprints",
      "Dedicated senior developer advisory assignments",
      "Comprehensive system load evaluation diagnostics"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CompanyPage({ params }: Props) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const company = companyData[slug];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceRequired, setServiceRequired] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formToast, setFormToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Auto-hide Toast notifications
  useEffect(() => {
    if (formToast) {
      const timer = setTimeout(() => setFormToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [formToast]);

  if (!company) {
    notFound();
  }

  const isContact = slug === "contact";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormToast(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company: companyName, service: serviceRequired, message })
      });
      if (response.ok) {
        setFormToast({ type: "success", message: "Inquiry received! We will connect with you shortly." });
        setName("");
        setEmail("");
        setCompanyName("");
        setServiceRequired("");
        setMessage("");
      } else {
        setFormToast({ type: "error", message: "Failed to submit inquiry. Please check your inputs." });
      }
    } catch (err) {
      setFormToast({ type: "error", message: "Failed to connect to Django database API." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Background decorations */}
      <div className="glow-orb glow-orb-primary" style={{ top: "10%", left: "10%" }}></div>
      <div className="glow-orb glow-orb-accent" style={{ bottom: "15%", right: "10%" }}></div>

      <Header />

      <main className={styles.main} style={{ paddingTop: "140px", paddingBottom: "80px", flex: 1 }}>
        <div style={{ width: "90%", maxWidth: "800px", zIndex: 10 }} className="animate-fade-in">
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--color-primary)", fontWeight: 600, marginBottom: "24px" }}>
            ← Back to Homepage
          </Link>
          
          <div className="glass-container" style={{ padding: "clamp(24px, 6vw, 48px) clamp(16px, 6vw, 40px)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Our Company
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "8px 0 16px", lineHeight: "1.1" }}>
              {company.title}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--color-text-secondary)", fontWeight: 500, lineHeight: "1.4", marginBottom: "24px" }}>
              {company.sub}
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginBottom: "32px" }}>
              {company.desc}
            </p>

            {isContact ? (
              <div style={{ marginTop: "24px" }}>
                <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>
                  <div className={styles.contactFormRow}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: "10px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: "#fff", outline: "none", fontSize: "13px" }}
                        disabled={loading}
                        required
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: "10px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: "#fff", outline: "none", fontSize: "13px" }}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.contactFormRow}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>Company Name</label>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        style={{ padding: "10px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: "#fff", outline: "none", fontSize: "13px" }}
                        disabled={loading}
                        required
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>Service Required</label>
                      <select
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        style={{ padding: "10px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: "#fff", outline: "none", fontSize: "13px", height: "40px" }}
                        disabled={loading}
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="WEB ENGINEERING">WEB ENGINEERING</option>
                        <option value="OMNICHANNEL MOBILE APPS">OMNICHANNEL MOBILE APPS</option>
                        <option value="CLOUD & DEVOPS AUTOMATION">CLOUD & DEVOPS AUTOMATION</option>
                        <option value="ENTERPRISE QUALITY ASSURANCE">ENTERPRISE QUALITY ASSURANCE</option>
                        <option value="OTHER INQUIRIES">OTHER INQUIRIES</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>Project Scope</label>
                    <textarea
                      placeholder="Tell us about your digital automation challenges..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ padding: "10px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: "#fff", outline: "none", fontSize: "13px", resize: "none" }}
                      disabled={loading}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "12px" }} disabled={loading}>
                    {loading ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </form>

                <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.06)", fontSize: "13.5px", color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>
                    <strong>General Inquiries:</strong>{" "}
                    <a href="mailto:hello@kalpanaaa.com" style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
                      hello@kalpanaaa.com
                    </a>
                  </div>
                  <div>
                    <strong>Phone Support:</strong>{" "}
                    <a href="tel:+917439067376" style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
                      +91 7439067376
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "16px" }}>
                  Key Principles & Indexes:
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, marginBottom: "40px" }}>
                  {company.features.map((feature, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {slug === "about-us" && (
                  <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.06)", marginBottom: "40px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
                      Our Leadership & Engineering Team
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                      Kalpanaaaa is directed by a core leadership group focused on technical excellence, strategic operations, and absolute reliability.
                    </p>
                    
                    <div style={{ background: "rgba(0,0,0,0.01)", border: "1px solid rgba(0,0,0,0.03)", borderRadius: "12px", padding: "20px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>
                        Leadership Specifications
                      </span>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                        <li style={{ fontSize: "14px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "var(--color-primary)", fontWeight: "bold" }}>•</span>
                          <span><strong>Gaurav Kr Tripathi</strong> — Founder, MD & CTO</span>
                        </li>
                        <li style={{ fontSize: "14px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "var(--color-primary)", fontWeight: "bold" }}>•</span>
                          <span><strong>Akshit Ujjain</strong> — Co-Founder & CEO</span>
                        </li>
                        <li style={{ fontSize: "14px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "var(--color-primary)", fontWeight: "bold" }}>•</span>
                          <span><strong>Rahul Kr Pathak</strong> — Chief Operating Officer</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  <Link href="/company/contact" className="btn-primary">
                    Contact Our Office
                  </Link>
                  <Link href="/dashboard" className="btn-secondary">
                    View Live Workspace
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Success/Error Toast notification */}
      {formToast && (
        <div className={`${styles.toast} ${formToast.type === "success" ? styles.toastSuccess : styles.toastError}`}>
          {formToast.message}
        </div>
      )}
    </div>
  );
}
