import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../page.module.css";

export default function PrivacyPage() {
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
              Legal Information
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "8px 0 16px", lineHeight: "1.1" }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginBottom: "24px" }}>
              Last updated: July 16, 2026
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
              <p>
                At Kalpanaaaa Software Solutions Pvt Ltd, we value your privacy and are committed to protecting your personal data. This privacy statement outlines our practices concerning data gathering and synchronization.
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "12px" }}>
                1. Data Collection
              </h3>
              <p>
                We only collect email addresses submitted voluntarily through our newsletter form or project messages sent via our contact view. These credentials are secure and synced to our local SQLite target.
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "12px" }}>
                2. Data Protection
              </h3>
              <p>
                We execute standard database encryption protocols and firewalls to guarantee that mock user records, interface models, and workspace parameters remain entirely secure and confidential.
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "12px" }}>
                3. Contact Us
              </h3>
              <p>
                If you have any questions regarding how we process or sync data, feel free to submit an inquiry through our <Link href="/company/contact" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
