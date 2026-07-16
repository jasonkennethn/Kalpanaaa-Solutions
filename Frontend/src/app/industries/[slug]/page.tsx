import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "../../page.module.css";

type IndustryData = {
  title: string;
  sub: string;
  desc: string;
  features: string[];
};

const industriesData: Record<string, IndustryData> = {
  "government": {
    title: "Government IT Solutions",
    sub: "Secure, compliant, and highly stable public sector systems.",
    desc: "Delivering secure database synchronization pipelines, identity verification systems, and server management solutions with zero system down times for regulatory organizations.",
    features: [
      "Regulatory standard security compliance",
      "Secure user permission controls and access logging",
      "High-availability system architectures with SQLite auditing"
    ]
  },
  "healthcare": {
    title: "Healthcare Systems & Apps",
    sub: "Fast, secure patient management and record sync pipelines.",
    desc: "Connecting medical databases with front-end clinical workspaces using secure APIs, automated data validation pipelines, and encrypted cloud clusters.",
    features: [
      "Data encryption standards and HIPAA alignment",
      "Real-time electronic health records (EHR) synchronization",
      "Fail-safe database architecture with automatic recovery alerts"
    ]
  },
  "finance": {
    title: "Financial Tech Infrastructure",
    sub: "High-speed transactional channels and secure ledger storage.",
    desc: "Deploying secure Docker-based transaction handlers, SQLite ledger audits, and automated stress testing dashboards to protect and optimize financial operations.",
    features: [
      "PCI-DSS compliance security pipelines",
      "High-performance low-latency data syncing",
      "Continuous transaction logging and integrity audits"
    ]
  },
  "education": {
    title: "Educational Tech Platforms",
    sub: "Scalable virtual learning portals and classroom workspaces.",
    desc: "Engineering high-traffic educational portals, digital visual compilers, and responsive database clusters for schools, universities, and virtual learning brands.",
    features: [
      "Scalable student database servers",
      "Dynamic visual compiler canvas elements",
      "Omnichannel multi-device online test portals"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industriesData[slug];

  if (!industry) {
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
              Enterprise Industry Segment
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "8px 0 16px", lineHeight: "1.1" }}>
              {industry.title}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--color-text-secondary)", fontWeight: 500, lineHeight: "1.4", marginBottom: "24px" }}>
              {industry.sub}
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginBottom: "32px" }}>
              {industry.desc}
            </p>

            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "16px" }}>
              Key Solutions Provided:
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, marginBottom: "40px" }}>
              {industry.features.map((feature, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/company/contact" className="btn-primary">
                Consult With Industry Experts
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                View Workspace
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
