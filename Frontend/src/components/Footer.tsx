"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../app/page.module.css";
import { API_BASE_URL } from "../config/api";

export default function Footer() {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Auto-hide Toast notifications
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    setSubscribeLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribe/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscriberEmail })
      });
      if (response.ok) {
        setToast({ type: "success", message: "Successfully subscribed to database updates!" });
        setSubscriberEmail("");
      } else {
        setToast({ type: "error", message: "This email address is already subscribed." });
      }
    } catch (err) {
      setToast({ type: "error", message: "Failed to connect to Django database API." });
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.logoArea}>
              <Image
                src="/logo.png"
                alt="Application Logo"
                width={210}
                height={140}
                style={{ width: "210px", height: "auto" }}
                className={styles.logoImage}
              />
            </div>
            <p className={styles.footerBrandDesc}>
              Providing enterprise-grade, full-lifecycle IT automation and software engineering solutions for complex digital challenges.
            </p>
            <div className={styles.footerSocials}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className={styles.footerColTitle}>OUR SERVICES</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}><Link href="/services/web-engineering">Web Engineering</Link></li>
              <li className={styles.footerLink}><Link href="/services/mobile-apps">Omnichannel Mobile Apps</Link></li>
              <li className={styles.footerLink}><Link href="/services/devops-automation">Cloud & DevOps Automation</Link></li>
              <li className={styles.footerLink}><Link href="/services/quality-assurance">Enterprise Quality Assurance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerColTitle}>Company</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}><Link href="/company/about-us">About Us</Link></li>
              <li className={styles.footerLink}><Link href="/company/career">Career</Link></li>
              <li className={styles.footerLink}><Link href="/company/testimonials">Testimonials</Link></li>
              <li className={styles.footerLink}><Link href="/company/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerColTitle}>Newsletter Sign Up</h4>
            <p className={styles.newsletterDesc}>Subscribe to follow project updates directly from our local database.</p>
            <form onSubmit={handleSubscribe} className={styles.newsletterBox}>
              <input
                type="email"
                placeholder="Enter your email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className={styles.newsletterInput}
                disabled={subscribeLoading}
                required
              />
              <button type="submit" className={styles.newsletterBtn} disabled={subscribeLoading}>
                {subscribeLoading ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2026 Kalpanaaaa Software Solutions Pvt Ltd. All rights reserved.</p>
          <div style={{ display: "flex", gap: "24px", fontSize: "12px", color: "var(--color-text-muted)" }}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Success/Error Floating Toast Alerts */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
