"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function Home() {
  const rotatingWords = ["Growth", "Scale", "Speed", "Security", "Stability"];
  const [wordIndex, setWordIndex] = useState(0);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const trustedCompanies = [
    { name: "Acme Corp", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polygon points="6 2 18 2 22 8 12 22 2 8 6 2"></polygon></svg> },
    { name: "AlphaTech", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
    { name: "Nova Dynamics", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg> },
    { name: "Apex Systems", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg> },
    { name: "Vector Labs", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M2 22h20M12 2v20M2 12h20"></path></svg> },
    { name: "Quantum Solutions", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg> },
    { name: "ByteCraft", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg> },
    { name: "Zenith IT", logo: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 2L2 22h20L12 2z"></path></svg> }
  ];

  const marqueeItems = [...trustedCompanies, ...trustedCompanies];

  const techStack = [
    { name: "Next.js", logo: <svg viewBox="0 0 180 180" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><circle cx="90" cy="90" r="90" fill="currentColor"/><path d="M149.508 157.52L69.142 54H54v72h12.858V72.222l69.213 89.658c4.432-4.103 8.44-8.625 11.937-13.48c.51-.71.51-1.39 0-1.88zM117 54h13v72h-13z" fill="#fff"/></svg> },
    { name: "React", logo: <svg viewBox="-11.5 -10.23174 23 20.46348" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
    { name: "Python", logo: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><path d="M11.93 2c-2.73 0-2.56 1.18-2.56 1.18l.01 1.23h2.6v.37H7.28S5.24 4.54 5.24 7.23c0 2.68 1.77 2.58 1.77 2.58h1.06v-1.5s-.08-1.78 1.75-1.78h3.31s1.73-.02 1.73-1.63V3.25S15.02 2 11.93 2z" fill="#3776AB"/><path d="M12.07 22c2.73 0 2.56-1.18 2.56-1.18l-.01-1.23h-2.6v-.37h4.7c0 0 2.04.24 2.04-2.45 0-2.68-1.77-2.58-1.77-2.58h-1.06v1.5s.08 1.78-1.75 1.78h-3.31s-1.73.02-1.73 1.63v1.65S8.98 22 12.07 22z" fill="#FFD343"/></svg> },
    { name: "Django", logo: <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><rect width="24" height="24" rx="4" fill="#092E20"/><path d="M7 6h4.5a5.5 5.5 0 0 1 0 11H7V6zm3 8a2.5 2.5 0 0 0 0-5H10v5z" fill="#fff"/></svg> },
    { name: "Docker", logo: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><path d="M13.983 8.878h-2.48V6.402h2.48v2.476zm3.037 0h-2.482V6.402h2.482v2.476zm-3.037 3.037h-2.48V9.439h2.48v2.476zm3.037 0h-2.482V9.439h2.482v2.476zm-6.075-3.037h-2.478V6.402h2.478v2.476zm-3.037 0H5.426V6.402h2.48v2.476zm3.037 3.037h-2.478V9.439h2.478v2.476zm-3.037 0H5.426V9.439h2.48v2.476zM23.99 12.18c-.286-.184-1.393-.847-3.411-.847-.223 0-.44.009-.652.025v-2.07h-2.478v4.954c0 .12-.007.24-.01.359-.142 2.37-1.782 3.99-4.148 3.99H2.89v1.23h10.36s4.04.145 6.4-2.825c1.64-2.062 2.115-4.48 2.115-4.48s1.67-.17 2.225-1.57c0-.007.006-.013.007-.02v-.01z"/></svg> },
    { name: "Kubernetes", logo: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><path d="M12 1.63L2.42 5.06v10.59L12 22.37l9.58-6.72V5.06L12 1.63zm0 2.22l7.58 2.71v8.4l-7.58 5.31-7.58-5.31V6.56l7.58-2.71zm0 3.75l-4.58 2.65v5.3l4.58 2.65 4.58-2.65v-5.3L12 7.6z"/></svg> },
    { name: "PostgreSQL", logo: <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22c5.523 0 10-2.239 10-5V7c0-2.761-4.477-5-10-5S2 4.239 2 7v10c0 2.761 4.477 5 10 5z"/><path d="M22 7c0 2.761-4.477 5-10 5S2 9.761 2 7"/><path d="M2 12c0 2.761 4.477 5 10 5s10-2.239 10-5"/></svg> },
    { name: "SQLite", logo: <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><rect width="24" height="24" rx="4" fill="#003B57"/><text x="12" y="16.2" fontFamily="system-ui" fontSize="9" fontWeight="900" fill="#fff" textAnchor="middle">SQL</text></svg> },
    { name: "TypeScript", logo: <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><rect width="24" height="24" rx="4" fill="#3178C6"/><text x="12" y="16.5" fontFamily="system-ui" fontSize="12" fontWeight="900" fill="#fff" textAnchor="middle">TS</text></svg> },
    { name: "AWS Cloud", logo: <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><rect width="24" height="24" rx="4" fill="#FF9900"/><path d="M6 16c2 1 4 2 6 2s4-1 6-2M12 6v6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> }
  ];

  const techMarqueeItems = [...techStack, ...techStack];

  const faqs = [
    {
      q: "How does the Mockup Sync API work?",
      a: "It connects your visual canvas editor to a secure local database, syncing records instantly using REST endpoints. This keeps frontend screens and database entries locked in perfect synchronization."
    },
    {
      q: "Is the platform HIPAA and PCI-DSS compliant?",
      a: "Yes, our industry-specific blueprints (for healthcare and finance) are designed to satisfy HIPAA and PCI-DSS requirements out-of-the-box, implementing full audit trails and user access logging."
    },
    {
      q: "Can I export production-ready code?",
      a: "Absolutely. The compiler outputs Next.js, React, and clean CSS modules immediately, ensuring zero layout shifts and lightweight load times."
    },
    {
      q: "How do I book an architectural consulting session?",
      a: "Simply fill out our Contact Us form on the contact page. Our senior engineering squad will review your system bottlenecks and arrange a dedicated technical architecture call."
    }
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Background glowing decorations */}
      <div className="glow-orb glow-orb-primary" style={{ top: "15%", left: "10%" }}></div>
      <div className="glow-orb glow-orb-accent" style={{ bottom: "20%", right: "15%" }}></div>

      <Header />

      {/* Hero Section */}
      <main className={styles.main} style={{ paddingTop: "150px", paddingBottom: "40px", flexDirection: "column" }}>
        <section className={styles.heroSection} style={{ width: "90%", maxWidth: "1000px", textAlign: "center", marginBottom: "48px", zIndex: 10 }}>
          <span style={{ display: "inline-block", padding: "6px 12px", background: "rgba(79, 70, 229, 0.08)", border: "1px solid rgba(79, 70, 229, 0.15)", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "20px" }} className="animate-fade-in">
            Enterprise-Grade Software
          </span>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: "1.08", marginBottom: "24px" }} className="animate-fade-in">
            Powering Enterprise<br />
            <span key={wordIndex} className={styles.rotatingWord}>
              {rotatingWords[wordIndex]}
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "var(--color-text-secondary)", maxWidth: "680px", margin: "0 auto 36px", lineHeight: "1.5" }} className="animate-fade-in">
            Providing full-lifecycle software solutions, dynamic visual workspace compilers, and secure Django databases syncing for modern, high-growth companies.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }} className="animate-fade-in">
            <Link href="/dashboard" className="btn-primary">
              Launch Workspace Demo
            </Link>
            <Link href="/company/contact" className="btn-secondary">
              Book Architecture Consultation
            </Link>
          </div>
        </section>

        {/* Brand Trust Loop Marquee */}
        <section style={{ width: "100%", overflow: "hidden", position: "relative", marginBottom: "64px", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Trusted by leading enterprise & scaling brands
            </span>
          </div>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {marqueeItems.map((item, idx) => (
                <div key={idx} className={styles.marqueeItem}>
                  {item.logo}
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview Grid */}
        <section style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Our Capabilities</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Enterprise Software Services</h2>
            </div>
            <Link href="/company/contact" style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-primary)" }}>
              Explore Consulting Services →
            </Link>
          </div>
          <div className={styles.servicesGrid}>
            <div className="glass-card">
              <span style={{ fontSize: "20px", marginBottom: "12px", display: "block" }}>💻</span>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>Web Engineering</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
                High-performance Next.js workspaces with custom component layouts and layout shifts minimized.
              </p>
              <Link href="/services/web-engineering" style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary)" }}>
                Explore Web Engineering →
              </Link>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "20px", marginBottom: "12px", display: "block" }}>📱</span>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>Omnichannel Mobile</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
                Beautiful cross-platform native iOS & Android applications with Apple-smooth transitions.
              </p>
              <Link href="/services/mobile-apps" style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary)" }}>
                Explore Mobile Apps →
              </Link>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "20px", marginBottom: "12px", display: "block" }}>⚙️</span>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>DevOps & Cloud</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
                Scale releases with Continuous Integration pipelines and Docker cloud orchestration structures.
              </p>
              <Link href="/services/devops-automation" style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary)" }}>
                Explore DevOps →
              </Link>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "20px", marginBottom: "12px", display: "block" }}>🛡️</span>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>Quality Assurance</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
                Continuous automated testing coverages, E2E browser validations, and SQLite database audits.
              </p>
              <Link href="/services/quality-assurance" style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary)" }}>
                Explore QA Systems →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Kalpanaa? Section */}
        <section style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Our Advantage</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Why Kalpanaa?</h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", maxWidth: "560px", margin: "8px auto 0", lineHeight: "1.5" }}>
              We combine mature enterprise engineering guidelines with lightning-fast automation.
            </p>
          </div>
          <div className={styles.whyGrid}>
            <div className="glass-card">
              <span style={{ fontSize: "24px", marginBottom: "12px", display: "block" }}>⚡</span>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>Speed & Precision</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Transpile prompts and mockup concepts into production-ready Next.js frontend code immediately.
              </p>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "24px", marginBottom: "12px", display: "block" }}>🔄</span>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>SQLite Sync API</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Connect local databases with secure Django REST framework endpoints to auto-sync workspaces.
              </p>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "24px", marginBottom: "12px", display: "block" }}>🔒</span>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>Enterprise Security</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Satisfy industry-level audit specifications with automated data encryptions and Kubernetes pipelines.
              </p>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "24px", marginBottom: "12px", display: "block" }}>✨</span>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>Premium Feel</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Cupertino-grade, layout-shift-free interface rendering systems crafted for details.
              </p>
            </div>
          </div>
        </section>

        {/* Products Highlights Section */}
        <section style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>SaaS Solutions</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Product Ecosystem</h2>
            </div>
            <Link href="/dashboard" style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-primary)" }}>
              Open Design Editor Workspace →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div className="glass-container" style={{ padding: "32px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>PLATFORM COMPILER</span>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Creative Interface Builder</h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                Our flagship design canvas. Transpile prompts into responsive mockups, editing HTML frameworks and raw styles interactively.
              </p>
              <Link href="/products/interface-builder" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "8px" }}>
                Learn More
              </Link>
            </div>
            <div className="glass-container" style={{ padding: "32px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>AI SYNTHESIZER</span>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>AI Code Engine</h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                Verify compilation errors, adjust grid flex spacing parameters, and refactor clean code instantly using developer assistant loops.
              </p>
              <Link href="/products/code-engine" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "8px" }}>
                Learn More
              </Link>
            </div>
            <div className="glass-container" style={{ padding: "32px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>REST DB GATEWAY</span>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Mockup Sync API</h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                Synchronize visual workspaces directly with local database tables using secure REST endpoints and automatic SQLite indexing.
              </p>
              <Link href="/products/sync-api" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "8px" }}>
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Technology Stack Section (Scrolling Marquee Track with Brand SVGs) */}
        <section style={{ width: "100%", overflow: "hidden", position: "relative", marginBottom: "80px", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Our Frameworks</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Technological Stack We Provide</h2>
          </div>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {techMarqueeItems.map((item, idx) => (
                <div key={idx} className={styles.marqueeItem}>
                  {item.logo}
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ width: "90%", maxWidth: "800px", marginBottom: "80px", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Got Questions?</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="glass-container" style={{ padding: "20px 24px", borderRadius: "12px", cursor: "pointer" }} onClick={() => setActiveFaq(isOpen ? null : idx)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: 650, color: "var(--color-text-primary)" }}>{faq.q}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)", marginTop: isOpen ? "12px" : "0" }}>
                    <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Section (Replaces Bottom Form) */}
        <section style={{ width: "90%", maxWidth: "800px", marginBottom: "60px", zIndex: 10 }} className="animate-fade-in">
          <div className="glass-container" style={{ padding: "48px 40px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Get Started</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, margin: "8px 0 16px", lineHeight: "1.1" }}>
              Ready to automate your digital workflow?
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", maxWidth: "540px", margin: "0 auto 28px", lineHeight: "1.6" }}>
              Book an engineering consultation today. Let our squad build responsive visual layouts and database sync integrations tailored to your specifications.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/company/contact" className="btn-primary">
                Schedule Free Consultation
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                Explore Demo Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
