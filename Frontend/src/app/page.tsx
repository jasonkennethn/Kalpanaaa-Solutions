"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, duration = 2000, trigger = true) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      setValue(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, trigger]);

  return value;
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function Home() {
  const rotatingWords = ["Growth", "Scale", "Speed", "Security", "Stability"];
  const [wordIndex, setWordIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [chartAnimated, setChartAnimated] = useState(false);

  // Scroll reveal refs
  const metricsReveal = useScrollReveal();
  const dashboardReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const whyReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const faqReveal = useScrollReveal();

  // Animated counter values
  const projectsCount = useCountUp(150, 2000, metricsReveal.visible);
  const clientsCount = useCountUp(85, 2000, metricsReveal.visible);
  const uptimeCount = useCountUp(99, 1800, metricsReveal.visible);
  const deploymentsCount = useCountUp(2400, 2500, metricsReveal.visible);

  // Rotating hero words
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Welcome tooltip: show once on first visit, auto-dismiss after 5s
  useEffect(() => {
    const seen = sessionStorage.getItem("kalpanaaa_tooltip_seen");
    if (!seen) {
      const delay = setTimeout(() => {
        setShowTooltip(true);
        sessionStorage.setItem("kalpanaaa_tooltip_seen", "1");
      }, 1200);
      const hide = setTimeout(() => setShowTooltip(false), 6200);
      return () => { clearTimeout(delay); clearTimeout(hide); };
    }
  }, []);

  // Trigger chart bar animation when dashboard mockup scrolls into view
  useEffect(() => {
    if (dashboardReveal.visible) {
      const t = setTimeout(() => setChartAnimated(true), 300);
      return () => clearTimeout(t);
    }
  }, [dashboardReveal.visible]);

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

  // Chart bar data for the dashboard mockup
  const chartBars = [
    { label: "Jan", height: 45, color: "rgba(79, 70, 229, 0.6)" },
    { label: "Feb", height: 62, color: "rgba(79, 70, 229, 0.7)" },
    { label: "Mar", height: 38, color: "rgba(79, 70, 229, 0.5)" },
    { label: "Apr", height: 78, color: "rgba(79, 70, 229, 0.8)" },
    { label: "May", height: 55, color: "rgba(79, 70, 229, 0.65)" },
    { label: "Jun", height: 90, color: "rgba(79, 70, 229, 0.85)" },
    { label: "Jul", height: 72, color: "rgba(8, 145, 178, 0.7)" },
    { label: "Aug", height: 95, color: "linear-gradient(180deg, #4f46e5, #0891b2)" },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Background glowing decorations */}
      <div className="glow-orb glow-orb-primary" style={{ top: "15%", left: "10%" }}></div>
      <div className="glow-orb glow-orb-accent" style={{ bottom: "20%", right: "15%" }}></div>

      <Header />

      {/* ─── Welcome Tooltip (appears once, fades over 5s) ─── */}
      {showTooltip && (
        <div className={styles.welcomeTooltip}>
          <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>✨ Kalpanaaa AI</span> is ready to help. Ask about our services, team, or products anytime!
        </div>
      )}

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

        {/* ─── Hero Dashboard Mockup (Browser Frame + Charts) ─── */}
        <section
          ref={dashboardReveal.ref}
          className={`${styles.scrollReveal} ${dashboardReveal.visible ? styles.scrollRevealVisible : ""}`}
          style={{ width: "90%", maxWidth: "960px", zIndex: 10, marginBottom: "80px" }}
        >
          <div className={styles.heroDashboardMockup}>
            {/* Browser Chrome Bar */}
            <div className={styles.browserBar}>
              <span className={styles.browserDot} style={{ background: "#ff5f57" }}></span>
              <span className={styles.browserDot} style={{ background: "#febc2e" }}></span>
              <span className={styles.browserDot} style={{ background: "#28c840" }}></span>
              <span className={styles.browserUrlBar}>kalpanaaa.com/dashboard</span>
            </div>
            {/* Dashboard Interior */}
            <div className={styles.dashboardContent}>
              {/* Left: Mini Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className={styles.pulseRing}></span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Live Analytics</span>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>Performance Overview</h3>
                </div>
                <div className={styles.miniStatsGrid}>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>99.9%</div>
                    <div className={styles.miniStatLabel}>Uptime</div>
                  </div>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>2.4k</div>
                    <div className={styles.miniStatLabel}>Deploys</div>
                  </div>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>150+</div>
                    <div className={styles.miniStatLabel}>Projects</div>
                  </div>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>85</div>
                    <div className={styles.miniStatLabel}>Clients</div>
                  </div>
                </div>
                {/* Mini Sparkline */}
                <div style={{ background: "rgba(248, 250, 252, 0.8)", borderRadius: "12px", padding: "14px", border: "1px solid rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Revenue Trend</div>
                  <svg viewBox="0 0 200 50" width="100%" height="50" style={{ display: "block" }}>
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(79,70,229,0.2)" />
                        <stop offset="100%" stopColor="rgba(79,70,229,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0,40 Q20,35 40,30 T80,22 T120,18 T160,10 T200,5" fill="none" stroke="#4f46e5" strokeWidth="2" className={styles.sparklinePath} />
                    <path d="M0,40 Q20,35 40,30 T80,22 T120,18 T160,10 T200,5 L200,50 L0,50 Z" fill="url(#sparkGrad)" opacity="0.5" />
                  </svg>
                </div>
              </div>

              {/* Right: Animated Bar Chart */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Monthly Deployments</div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1 }}>2,847</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "4px 10px", borderRadius: "20px" }}>↑ 24.3%</span>
                </div>
                <div className={styles.chartContainer} style={{ flex: 1 }}>
                  {chartBars.map((bar, i) => (
                    <div
                      key={i}
                      className={styles.chartBar}
                      style={{
                        height: chartAnimated ? `${bar.height}%` : "0%",
                        background: bar.color,
                        transitionDelay: `${i * 0.08}s`
                      }}
                    >
                      <span className={styles.chartLabel}>{bar.label}</span>
                    </div>
                  ))}
                </div>
                {/* Bottom row: small activity indicators */}
                <div style={{ display: "flex", gap: "16px", marginTop: "28px" }}>
                  {[
                    { label: "API Calls", value: "1.2M", color: "#4f46e5" },
                    { label: "Latency", value: "42ms", color: "#0891b2" },
                    { label: "Error Rate", value: "0.02%", color: "#10b981" },
                  ].map((stat, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: stat.color }}>{stat.value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

        {/* ─── Animated Metrics Counters ─── */}
        <section
          ref={metricsReveal.ref}
          className={`${styles.scrollReveal} ${metricsReveal.visible ? styles.scrollRevealVisible : ""}`}
          style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>By The Numbers</span>
            <div className={styles.gradientLine} style={{ marginTop: "12px" }}></div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Platform Performance Metrics</h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", maxWidth: "560px", margin: "8px auto 0", lineHeight: "1.5" }}>
              Real-time analytics powering enterprise growth at scale.
            </p>
          </div>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{projectsCount}+</div>
              <div className={styles.metricLabel}>Projects Delivered</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{clientsCount}+</div>
              <div className={styles.metricLabel}>Enterprise Clients</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{uptimeCount}.9%</div>
              <div className={styles.metricLabel}>System Uptime</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{deploymentsCount}+</div>
              <div className={styles.metricLabel}>Deployments</div>
            </div>
          </div>
        </section>

        {/* Services Overview Grid */}
        <section
          ref={servicesReveal.ref}
          className={`${styles.scrollReveal} ${servicesReveal.visible ? styles.scrollRevealVisible : ""}`}
          style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}
        >
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
        <section
          ref={whyReveal.ref}
          className={`${styles.scrollReveal} ${whyReveal.visible ? styles.scrollRevealVisible : ""}`}
          style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Our Advantage</span>
            <div className={styles.gradientLine} style={{ marginTop: "12px" }}></div>
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
        <section
          ref={productsReveal.ref}
          className={`${styles.scrollReveal} ${productsReveal.visible ? styles.scrollRevealVisible : ""}`}
          style={{ width: "90%", maxWidth: "1200px", marginBottom: "80px", zIndex: 10 }}
        >
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
              {/* Mini visual: small area chart */}
              <div style={{ marginBottom: "16px", background: "rgba(248,250,252,0.6)", borderRadius: "10px", padding: "12px" }}>
                <svg viewBox="0 0 200 40" width="100%" height="40" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="prodGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(79,70,229,0.15)" />
                      <stop offset="100%" stopColor="rgba(79,70,229,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M0,35 Q25,30 50,28 T100,20 T150,12 T200,8" fill="none" stroke="#4f46e5" strokeWidth="1.5" className={styles.sparklinePath} />
                  <path d="M0,35 Q25,30 50,28 T100,20 T150,12 T200,8 L200,40 L0,40 Z" fill="url(#prodGrad1)" opacity="0.6" />
                </svg>
              </div>
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
              {/* Mini visual: dot pattern */}
              <div style={{ marginBottom: "16px", background: "rgba(248,250,252,0.6)", borderRadius: "10px", padding: "12px" }}>
                <svg viewBox="0 0 200 40" width="100%" height="40" style={{ display: "block" }}>
                  {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((x, i) => (
                    <circle key={i} cx={x} cy={35 - i * 3.2} r="3" fill="#4f46e5" opacity={0.3 + i * 0.08} />
                  ))}
                  <path d="M0,35 C25,33 50,28 75,25 S125,16 150,12 S200,5 200,5" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
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
              {/* Mini visual: horizontal bars */}
              <div style={{ marginBottom: "16px", background: "rgba(248,250,252,0.6)", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[85, 72, 93, 65].map((w, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "8px", color: "var(--color-text-muted)", width: "40px", fontWeight: 600 }}>EP-{i + 1}</span>
                    <div style={{ flex: 1, height: "6px", background: "rgba(0,0,0,0.04)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg, #4f46e5, #0891b2)`, borderRadius: "3px", transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}></div>
                    </div>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--color-primary)", width: "28px", textAlign: "right" }}>{w}%</span>
                  </div>
                ))}
              </div>
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
        <section
          ref={faqReveal.ref}
          className={`${styles.scrollReveal} ${faqReveal.visible ? styles.scrollRevealVisible : ""}`}
          style={{ width: "90%", maxWidth: "800px", marginBottom: "80px", zIndex: 10 }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Got Questions?</span>
            <div className={styles.gradientLine} style={{ marginTop: "12px" }}></div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginTop: "4px" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="glass-container" style={{ padding: "20px 24px", borderRadius: "12px", cursor: "pointer" }} onClick={() => setActiveFaq(isOpen ? null : idx)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: 650, color: "var(--color-text-primary)" }}>{faq.q}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)", marginTop: isOpen ? "12px" : "0" }}>
                    <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Section */}
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
