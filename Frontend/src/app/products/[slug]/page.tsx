import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "../../page.module.css";

type ProductData = {
  title: string;
  sub: string;
  desc: string;
  features: string[];
};

const productsData: Record<string, ProductData> = {
  "interface-builder": {
    title: "Creative Interface Builder",
    sub: "Design and export production-ready screens instantly.",
    desc: "An intuitive web canvas editor designed to compile your prompts into clean HTML/CSS/React mockups. Fully integrated with responsive grids and flexible layouts to accelerate frontend development speeds.",
    features: [
      "Real-time visual editor canvas with split-view editor modules",
      "Next.js, TypeScript, & React compiler exports",
      "Zero layout shift design architectures"
    ]
  },
  "code-engine": {
    title: "AI Code Engine",
    sub: "High-performance generative pipeline for clean engineering outputs.",
    desc: "Automate complex codebase creation, code refactoring, styling, and design system compilation. Verify TypeScript typing in real-time to avoid build-time errors and speed up deployment cycles.",
    features: [
      "Real-time TypeScript compilation checks",
      "TailwindCSS, CSS modules, and styled components support",
      "Intelligent code analysis and optimization gateways"
    ]
  },
  "sync-api": {
    title: "Mockup Sync API",
    sub: "Seamless sync of code blueprints to local database targets.",
    desc: "Manage, audit, update, and deploy mockup project files with lightning-fast REST synchronization pipelines. Seamlessly connect local SQLite file databases with Django backends.",
    features: [
      "Secure REST Django API data sync gateways",
      "Local SQLite file records auditing and caching",
      "Instant dashboard dashboard refresh webhooks"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productsData[slug];

  if (!product) {
    notFound();
  }

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
              Enterprise Product
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "8px 0 16px", lineHeight: "1.1" }}>
              {product.title}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--color-text-secondary)", fontWeight: 500, lineHeight: "1.4", marginBottom: "24px" }}>
              {product.sub}
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginBottom: "32px" }}>
              {product.desc}
            </p>

            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "16px" }}>
              Key Features & Capabilities:
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, marginBottom: "40px" }}>
              {product.features.map((feature, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/dashboard" className="btn-primary">
                Try Developer Demo
              </Link>
              <Link href="/company/contact" className="btn-secondary">
                Request API Access
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
