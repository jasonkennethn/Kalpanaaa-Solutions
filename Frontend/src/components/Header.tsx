"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../app/page.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);

  const toggleMobileGroup = (groupName: string) => {
    setExpandedMobileGroup(expandedMobileGroup === groupName ? null : groupName);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setExpandedMobileGroup(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <div className={styles.logoArea}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Application Logo"
              width={210}
              height={140}
              style={{ width: "210px", height: "auto" }}
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>
        <nav className={styles.navLinks}>
          {/* INDUSTRIES Dropdown */}
          <div className={styles.dropdownContainer}>
            <span className={styles.navLink}>
              INDUSTRIES
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", transition: "transform 0.2s" }} className={styles.chevronIcon}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className={styles.dropdownMenu}>
              <Link href="/industries/government" className={styles.dropdownItem}>GOVERNMENT</Link>
              <Link href="/industries/healthcare" className={styles.dropdownItem}>HEALTHCARE</Link>
              <Link href="/industries/finance" className={styles.dropdownItem}>FINANCE</Link>
              <Link href="/industries/education" className={styles.dropdownItem}>EDUCATION</Link>
            </div>
          </div>

          {/* PRODUCTS Dropdown */}
          <div className={styles.dropdownContainer}>
            <span className={styles.navLink}>
              PRODUCTS
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", transition: "transform 0.2s" }} className={styles.chevronIcon}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className={styles.dropdownMenu}>
              <Link href="/products/interface-builder" className={styles.dropdownItem}>CREATIVE INTERFACE BUILDER</Link>
              <Link href="/products/code-engine" className={styles.dropdownItem}>AI CODE ENGINE</Link>
              <Link href="/products/sync-api" className={styles.dropdownItem}>MOCKUP SYNC API</Link>
            </div>
          </div>

          {/* SERVICES Dropdown */}
          <div className={styles.dropdownContainer}>
            <span className={styles.navLink}>
              SERVICES
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", transition: "transform 0.2s" }} className={styles.chevronIcon}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className={styles.dropdownMenu}>
              <Link href="/services/web-engineering" className={styles.dropdownItem}>WEB ENGINEERING</Link>
              <Link href="/services/mobile-apps" className={styles.dropdownItem}>OMNICHANNEL MOBILE APPS</Link>
              <Link href="/services/devops-automation" className={styles.dropdownItem}>CLOUD & DEVOPS AUTOMATION</Link>
              <Link href="/services/quality-assurance" className={styles.dropdownItem}>ENTERPRISE QUALITY ASSURANCE</Link>
            </div>
          </div>

          {/* OUR COMPANY Dropdown */}
          <div className={styles.dropdownContainer}>
            <span className={styles.navLink}>
              OUR COMPANY
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", transition: "transform 0.2s" }} className={styles.chevronIcon}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className={styles.dropdownMenu}>
              <Link href="/company/about-us" className={styles.dropdownItem}>ABOUT US</Link>
              <Link href="/company/career" className={styles.dropdownItem}>CAREER</Link>
              <Link href="/company/testimonials" className={styles.dropdownItem}>TESTIMONIALS</Link>
            </div>
          </div>
        </nav>

        {/* Re-designed 3-line Hamburger Menu Toggle Button */}
        <div className={styles.rightActions}>
          <Link href="/company/contact" className={styles.headerContactBtn}>
            CONTACT US
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.mobileMenuToggleActive : ""}`}
            aria-label="Toggle Navigation Menu"
          >
            <div className={styles.hamburgerIcon}>
              <span className={styles.toggleBar}></span>
              <span className={styles.toggleBar}></span>
              <span className={styles.toggleBar}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Re-designed Apple-style Mobile Menu Dropdown Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.mobileMenuOverlayActive : ""}`}>
        <div className={styles.mobileMenuScrollable}>
          {/* Industries Group */}
          <div className={styles.mobileGroup}>
            <div 
              onClick={() => toggleMobileGroup("industries")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "8px 0" }}
            >
              <h5 className={styles.mobileGroupTitle} style={{ margin: 0 }}>INDUSTRIES</h5>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedMobileGroup === "industries" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: "var(--color-text-secondary)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div style={{
              maxHeight: expandedMobileGroup === "industries" ? "200px" : "0",
              opacity: expandedMobileGroup === "industries" ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              paddingLeft: "8px"
            }}>
              <Link href="/industries/government" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>GOVERNMENT</Link>
              <Link href="/industries/healthcare" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>HEALTHCARE</Link>
              <Link href="/industries/finance" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>FINANCE</Link>
              <Link href="/industries/education" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>EDUCATION</Link>
            </div>
          </div>

          {/* Products Group */}
          <div className={styles.mobileGroup}>
            <div 
              onClick={() => toggleMobileGroup("products")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "8px 0" }}
            >
              <h5 className={styles.mobileGroupTitle} style={{ margin: 0 }}>PRODUCTS</h5>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedMobileGroup === "products" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: "var(--color-text-secondary)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div style={{
              maxHeight: expandedMobileGroup === "products" ? "180px" : "0",
              opacity: expandedMobileGroup === "products" ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              paddingLeft: "8px"
            }}>
              <Link href="/products/interface-builder" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>CREATIVE INTERFACE BUILDER</Link>
              <Link href="/products/code-engine" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>AI CODE ENGINE</Link>
              <Link href="/products/sync-api" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>MOCKUP SYNC API</Link>
            </div>
          </div>
          
          {/* Services Group */}
          <div className={styles.mobileGroup}>
            <div 
              onClick={() => toggleMobileGroup("services")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "8px 0" }}
            >
              <h5 className={styles.mobileGroupTitle} style={{ margin: 0 }}>SERVICES</h5>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedMobileGroup === "services" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: "var(--color-text-secondary)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div style={{
              maxHeight: expandedMobileGroup === "services" ? "240px" : "0",
              opacity: expandedMobileGroup === "services" ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              paddingLeft: "8px"
            }}>
              <Link href="/services/web-engineering" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>WEB ENGINEERING</Link>
              <Link href="/services/mobile-apps" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>OMNICHANNEL MOBILE APPS</Link>
              <Link href="/services/devops-automation" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>CLOUD & DEVOPS AUTOMATION</Link>
              <Link href="/services/quality-assurance" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>ENTERPRISE QUALITY ASSURANCE</Link>
            </div>
          </div>

          {/* Company Group */}
          <div className={styles.mobileGroup}>
            <div 
              onClick={() => toggleMobileGroup("company")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "8px 0" }}
            >
              <h5 className={styles.mobileGroupTitle} style={{ margin: 0 }}>OUR COMPANY</h5>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedMobileGroup === "company" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: "var(--color-text-secondary)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div style={{
              maxHeight: expandedMobileGroup === "company" ? "180px" : "0",
              opacity: expandedMobileGroup === "company" ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              paddingLeft: "8px"
            }}>
              <Link href="/company/about-us" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>ABOUT US</Link>
              <Link href="/company/career" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>CAREER</Link>
              <Link href="/company/testimonials" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>TESTIMONIALS</Link>
            </div>
          </div>

          {/* Contact Us button inside mobile drawer */}
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column" }}>
            <Link 
              href="/company/contact" 
              onClick={handleMobileLinkClick}
              style={{
                textAlign: "center",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                color: "#fff",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.08em",
                padding: "12px",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)"
              }}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
