"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import { API_BASE_URL } from "../../config/api";
import styles from "./page.module.css";

interface StatCardComponent {
  type: "stat_card";
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

interface ChartComponent {
  type: "chart";
  title: string;
  data: number[];
}

interface ListComponent {
  type: "list";
  title: string;
  items: string[];
}

type PreviewComponent = StatCardComponent | ChartComponent | ListComponent;

interface GeneratedProject {
  id: number;
  title: string;
  prompt: string;
  category: string;
  preview_data_parsed: {
    theme?: {
      primary?: string;
      secondary?: string;
      background?: string;
    };
    components?: PreviewComponent[];
  };
  code_html: string;
  code_css: string;
  created_at: string;
}

const fallbackProjects: GeneratedProject[] = [
  {
    id: 101,
    title: "System Metrics Monitor",
    prompt: "Build an enterprise performance panel showing server loads and cluster statuses.",
    category: "Analytics",
    preview_data_parsed: {
      theme: {
        background: "rgba(11, 15, 25, 0.95)",
        primary: "var(--color-primary)",
      },
      components: [
        {
          type: "stat_card",
          title: "Active Database Clusters",
          value: "34 / 34 Online",
          change: "+12.8% this month (stable)",
          trend: "up"
        },
        {
          type: "stat_card",
          title: "Average REST API Sync Latency",
          value: "14.2 ms",
          change: "-4.5ms (faster)",
          trend: "up"
        },
        {
          type: "chart",
          title: "Network Sync Throughput (Kb/s)",
          data: [40, 60, 45, 80, 75, 90, 85, 100]
        }
      ]
    },
    code_html: "",
    code_css: "",
    created_at: new Date().toISOString()
  },
  {
    id: 102,
    title: "SaaS Subscription Ledger",
    prompt: "Create an executive billing dashboard detailing recurring revenues and invoice backlogs.",
    category: "Billing",
    preview_data_parsed: {
      theme: {
        background: "rgba(12, 10, 26, 0.95)",
        primary: "var(--color-accent)",
      },
      components: [
        {
          type: "stat_card",
          title: "Monthly Recurring Revenue (MRR)",
          value: "$48,250",
          change: "+8.3% increase vs last week",
          trend: "up"
        },
        {
          type: "list",
          title: "Recent Invoice Activity Log",
          items: [
            "INV-8834 ($1,250.00) - PAID ON SYNC",
            "INV-8833 ($450.00) - PAID ON SYNC",
            "INV-8832 ($3,400.00) - PENDING LEDGER"
          ]
        }
      ]
    },
    code_html: "",
    code_css: "",
    created_at: new Date().toISOString()
  },
  {
    id: 103,
    title: "AI Code Compile Terminal",
    prompt: "Design a terminal command shell dashboard representing compilation checks.",
    category: "Development",
    preview_data_parsed: {
      theme: {
        background: "rgba(4, 13, 18, 0.95)",
        primary: "#10b981",
      },
      components: [
        {
          type: "list",
          title: "Next.js Compiler Standard Output",
          items: [
            "✓ turbopack compiled in 1.6s",
            "✓ typescript typechecked successfully",
            "✓ static pages optimized (7/7)"
          ]
        },
        {
          type: "chart",
          title: "Build Sizing Optimization (MB)",
          data: [90, 80, 50, 40, 30, 25, 20, 16]
        }
      ]
    },
    code_html: "",
    code_css: "",
    created_at: new Date().toISOString()
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState<GeneratedProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<GeneratedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Auto-hide Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch all projects from Django Backend on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/`);
      if (!response.ok) throw new Error("Failed to fetch projects list.");
      const data = await response.json();
      if (data && data.length > 0) {
        setProjects(data);
        setSelectedProject(data[0]);
      } else {
        setProjects(fallbackProjects);
        setSelectedProject(fallbackProjects[0]);
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Serving offline templates." });
      setProjects(fallbackProjects);
      setSelectedProject(fallbackProjects[0]);
    } finally {
      setLoading(false);
    }
  };

  // API Call: Delete Project
  const handleDeleteProject = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this mockup project record?")) return;

    if (id >= 101 && id <= 103) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);
      setToast({ type: "success", message: "Mockup template hidden from view." });
      if (selectedProject?.id === id) {
        setSelectedProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
      }
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}/`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Deletion failed.");

      setToast({ type: "success", message: "Mockup project deleted." });
      
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);

      if (selectedProject?.id === id) {
        setSelectedProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
      }
    } catch (err) {
      setToast({ type: "error", message: "Could not remove project. Please try again." });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className={styles.container}>
      {/* Global Header */}
      <Header />

      {/* Decorative Blur Nodes */}
      <div className="glow-orb glow-orb-primary" style={{ top: "20%", left: "30%" }}></div>
      <div className="glow-orb glow-orb-accent" style={{ bottom: "10%", right: "20%" }}></div>

      <div className={styles.dashboardWrapper}>
        {/* Sidebar List */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href="/" style={{ fontSize: "12px", color: "var(--color-accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              ← Return to Homepage
            </Link>
          </div>

          <div className={styles.projectList}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-text-secondary)", fontSize: "14px" }}>
                Syncing records...
              </div>
            ) : projects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--color-text-muted)", fontSize: "13px" }}>
                No mockups generated yet. Go back and type a prompt!
              </div>
            ) : (
              projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`${styles.projectItem} ${selectedProject?.id === proj.id ? styles.projectItemActive : ""}`}
                >
                  <span className={styles.itemTitle}>{proj.title}</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "90%" }}>
                    {proj.prompt}
                  </span>
                  <div className={styles.itemMeta}>
                    <span>{proj.category}</span>
                    <span>{formatDate(proj.created_at)}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(proj.id, e)}
                    className={styles.deleteBtn}
                    title="Delete project"
                  >
                    ✕
                  </button>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main Panel Content */}
        <main className={styles.mainContent}>
          {selectedProject ? (
            <>
              <header className={styles.mainHeader}>
                <div>
                  <h2 className={styles.mainHeaderTitle}>{selectedProject.title}</h2>
                  <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                    <strong>Blueprint Description:</strong> {selectedProject.category} Template System
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "11px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)", padding: "6px 12px", borderRadius: "20px" }}>
                    ID: #{selectedProject.id}
                  </span>
                </div>
              </header>

              <div className={styles.dashboardWorkspace}>
                {/* Left Column: Device Mockup Window */}
                <div className={styles.mockupContainer}>
                  <div className={styles.browserWindow}>
                    <div className={styles.browserHeader}>
                      <div className={styles.windowControls}>
                        <span className={styles.controlDot} style={{ background: "#ef4444" }}></span>
                        <span className={styles.controlDot} style={{ background: "#f59e0b" }}></span>
                        <span className={styles.controlDot} style={{ background: "#10b981" }}></span>
                      </div>
                      <div className={styles.addressBar}>
                        https://mockups.kalpanaaa.com/view/{selectedProject.id}
                      </div>
                      <span style={{ fontSize: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "2px 8px", borderRadius: "10px", fontWeight: 600 }}>
                        {selectedProject.category}
                      </span>
                    </div>

                    <div className={styles.browserBody}>
                      <div style={{ width: "100%", maxWidth: "420px" }}>
                        <div style={{
                          padding: "24px",
                          borderRadius: "16px",
                          background: selectedProject.preview_data_parsed.theme?.background || "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(16px)"
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <h4 style={{ fontSize: "16px", fontWeight: 700 }}>{selectedProject.title}</h4>
                            <span style={{ fontSize: "10px", background: "rgba(99, 102, 241, 0.2)", color: "#a5b4fc", padding: "2px 8px", borderRadius: "10px" }}>Live</span>
                          </div>

                          {selectedProject.preview_data_parsed.components?.map((component, idx) => {
                            if (component.type === "stat_card") {
                              return (
                                <div key={idx} style={{
                                  background: "rgba(255, 255, 255, 0.02)",
                                  border: "1px solid rgba(255, 255, 255, 0.04)",
                                  padding: "16px",
                                  borderRadius: "10px",
                                  marginBottom: "12px"
                                }}>
                                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{component.title}</p>
                                  <h5 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>{component.value}</h5>
                                  <span style={{ fontSize: "11px", color: component.trend === "up" ? "#10b981" : "#ef4444", display: "block", marginTop: "4px" }}>
                                    {component.change}
                                  </span>
                                </div>
                              );
                            } else if (component.type === "chart") {
                              return (
                                <div key={idx} style={{
                                  background: "rgba(255, 255, 255, 0.01)",
                                  border: "1px solid rgba(255, 255, 255, 0.04)",
                                  padding: "16px",
                                  borderRadius: "10px",
                                  marginBottom: "12px"
                                }}>
                                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>{component.title}</p>
                                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "80px", padding: "0 8px" }}>
                                    {component.data.map((val, cIdx) => (
                                      <div key={cIdx} style={{
                                        width: "10%",
                                        height: `${val}%`,
                                        background: `linear-gradient(180deg, ${selectedProject.preview_data_parsed.theme?.primary || "var(--color-primary)"}, rgba(255,255,255,0.02))`,
                                        borderRadius: "3px",
                                        transition: "height 0.8s ease"
                                      }}></div>
                                    ))}
                                  </div>
                                </div>
                              );
                            } else if (component.type === "list") {
                              return (
                                <div key={idx} style={{
                                  background: "rgba(255, 255, 255, 0.02)",
                                  border: "1px solid rgba(255, 255, 255, 0.04)",
                                  padding: "16px",
                                  borderRadius: "10px"
                                }}>
                                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "8px" }}>{component.title}</p>
                                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {component.items.map((item, itemIdx) => (
                                      <li key={itemIdx} style={{ fontSize: "12px", color: "#d1d5db", padding: "6px 0", borderBottom: itemIdx < component.items.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Specifications Detail Block */}
                <div className={styles.analysisColumn}>
                  <div className="glass-container" style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Mockup Breakdown</span>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>System Specifications</h3>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                        <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Blueprint Title:</span>
                        <span style={{ fontSize: "13px", fontWeight: 600 }}>{selectedProject.title}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                        <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Sync Category:</span>
                        <span style={{ fontSize: "13px", fontWeight: 600 }}>{selectedProject.category}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                        <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Creation Timestamp:</span>
                        <span style={{ fontSize: "13px", fontWeight: 600 }}>{formatDate(selectedProject.created_at)}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>AI Prompter Context:</span>
                        <blockquote style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", background: "rgba(0,0,0,0.015)", borderLeft: "3.5px solid var(--color-primary)", padding: "12px 14px", margin: 0, borderRadius: "0 8px 8px 0", lineHeight: "1.45" }}>
                          "{selectedProject.prompt}"
                        </blockquote>
                      </div>
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                      <Link href="/company/contact" className="btn-primary" style={{ width: "100%", textAlign: "center" }}>
                        Request Workspace Migration
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📂</div>
              <h3 className={styles.emptyTitle}>Console Workspace Empty</h3>
              <p className={styles.emptyDesc}>
                There are no saved visual mockups in the Django SQLite database. Return to the home workspace to generate styling sets.
              </p>
              <Link href="/" className="btn-primary">
                Generate New Interface
              </Link>
            </div>
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`} style={{ position: "fixed", bottom: "24px", right: "24px", padding: "16px 24px", borderRadius: "12px", backdropFilter: "blur(12px)", zIndex: 1000 }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
