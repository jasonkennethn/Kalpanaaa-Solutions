import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../page.module.css";

export default function TermsPage() {
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
              Legal Agreement
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "8px 0 16px", lineHeight: "1.1" }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginBottom: "24px" }}>
              Last updated: July 16, 2026
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
              <p>
                Welcome to Kalpanaaaa. By accessing our platform visual compilers or utilizing our Mockup Sync API, you agree to comply with the terms and stipulations outline below.
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "12px" }}>
                1. Acceptance of Terms
              </h3>
              <p>
                By checking out design workspaces or sending database subscriber records, you agree to satisfy our operational agreements. If you do not accept these criteria, please cease operations on the site.
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "12px" }}>
                2. User License & Workspace Integrity
              </h3>
              <p>
                Users are allowed temporary, non-transferable access to evaluate design system builders, compile layout outputs, and test API synchronization parameters with local databases.
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "12px" }}>
                3. Operational Inquiries
              </h3>
              <p>
                For questions regarding terms of use or layout compliance, please submit an inquiry through our dedicated <Link href="/company/contact" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
