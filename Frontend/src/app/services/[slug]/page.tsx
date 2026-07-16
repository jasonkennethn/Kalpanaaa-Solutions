import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "../../page.module.css";

type ServiceData = {
  title: string;
  sub: string;
  desc: string;
  features: string[];
};

const servicesData: Record<string, ServiceData> = {
  "web-engineering": {
    title: "Web Engineering Services",
    sub: "Enterprise-grade, high-performance web products.",
    desc: "Developing fast, fully responsive, and robust web applications with clean architecture and maximum search engine optimization. We build state-of-the-art SaaS structures and workspace layouts using modern frameworks.",
    features: [
      "Next.js & React framework expert architectures",
      "Dynamic data binding and responsive flex layouts",
      "Performance optimization with zero layout shifts"
    ]
  },
  "mobile-apps": {
    title: "Omnichannel Mobile Apps",
    sub: "Beautiful native applications for iOS and Android.",
    desc: "Crafting fully interactive mobile experiences using clean animations, native system APIs, and smooth page transits. Our cross-platform solutions run seamlessly on iOS and Android with single codebase support.",
    features: [
      "React Native & Flutter native-grade performance",
      "Fluid micro-animations with Apple-like scroll behaviors",
      "Offline-first sync capabilities with local secure caching"
    ]
  },
  "devops-automation": {
    title: "Cloud & DevOps Automation",
    sub: "Fully managed automation and cloud pipelines.",
    desc: "Speed up software releases and scaling with mature continuous integration pipelines and robust cloud infrastructure design. We secure and automate local server deployments for maximum performance.",
    features: [
      "Docker, Kubernetes, and cloud host clustering",
      "CI/CD release automations with lint validation checks",
      "High-availability server designs with automated recovery webhooks"
    ]
  },
  "quality-assurance": {
    title: "Enterprise Quality Assurance",
    sub: "Comprehensive automated test verification systems.",
    desc: "Protect your systems with test coverages, automated browser end-to-end evaluations, and database integrity checks. We ensure zero data loss during sync pipelines and migrations.",
    features: [
      "End-to-end automated testing suites",
      "System load, performance and concurrency stress tests",
      "SQLite data consistency auditing scripts"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
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
              Enterprise Service
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "8px 0 16px", lineHeight: "1.1" }}>
              {service.title}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--color-text-secondary)", fontWeight: 500, lineHeight: "1.4", marginBottom: "24px" }}>
              {service.sub}
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginBottom: "32px" }}>
              {service.desc}
            </p>

            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "16px" }}>
              Our Service Capabilities:
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, marginBottom: "40px" }}>
              {service.features.map((feature, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/company/contact" className="btn-primary">
                Book a Consultation
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                See Live Mockups
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
