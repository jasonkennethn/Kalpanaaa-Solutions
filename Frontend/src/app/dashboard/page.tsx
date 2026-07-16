"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  const handleDeleteProject = (id: number, e: React.MouseEvent) => {
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

    fetch(`${API_BASE_URL}/api/projects/${id}/`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error("Deletion failed.");
        setToast({ type: "success", message: "Mockup project deleted." });
        const updatedProjects = projects.filter((p) => p.id !== id);
        setProjects(updatedProjects);
        if (selectedProject?.id === id) {
          setSelectedProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
        }
      })
      .catch(() => {
        setToast({ type: "error", message: "Could not remove project. Please try again." });
      });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
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
        {/* ─── Sidebar ─── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.sidebarBackLink}>
              ← Return to Homepage
            </Link>
            <span className={styles.sidebarTitle}>Workspace Projects</span>
          </div>

          <div className={styles.projectList}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-text-muted)", fontSize: "13px" }}>
                Syncing records...
              </div>
            ) : projects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--color-text-muted)", fontSize: "12px", lineHeight: "1.5" }}>
                No mockups generated yet. Return to workspace to generate styling sets.
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(proj)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(proj)}
                  className={`${styles.projectItem} ${selectedProject?.id === proj.id ? styles.projectItemActive : ""}`}
                >
                  <span className={styles.itemTitle}>{proj.title}</span>
                  <span className={styles.itemPrompt}>{proj.prompt}</span>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemCategoryBadge}>{proj.category}</span>
                    <span>{formatDate(proj.created_at)}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(proj.id, e)}
                    className={styles.deleteBtn}
                    title="Delete project"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ─── Main Panel Content ─── */}
        <main className={styles.mainContent}>
          {selectedProject ? (
            <>
              <header className={styles.mainHeader}>
                <div>
                  <h2 className={styles.mainHeaderTitle}>{selectedProject.title}</h2>
                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                    {selectedProject.category} Template System
                  </p>
                </div>
                <div className={styles.headerBadges}>
                  <span className={styles.headerBadge}>ID: #{selectedProject.id}</span>
                  <span className={`${styles.headerBadge} ${styles.headerBadgeLive}`}>● Live</span>
                </div>
              </header>

              <div className={styles.dashboardWorkspace}>
                {/* Left Column: Device Mockup Window */}
                <div className={styles.mockupContainer}>
                  <div className={styles.browserWindow}>
                    <div className={styles.browserHeader}>
                      <div className={styles.windowControls}>
                        <span className={styles.controlDot} style={{ background: "#ff5f57" }}></span>
                        <span className={styles.controlDot} style={{ background: "#febc2e" }}></span>
                        <span className={styles.controlDot} style={{ background: "#28c840" }}></span>
                      </div>
                      <div className={styles.addressBar}>
                        https://mockups.kalpanaaa.com/view/{selectedProject.id}
                      </div>
                      <span className={styles.browserBadge}>{selectedProject.category}</span>
                    </div>

                    <div className={styles.browserBody}>
                      <div className={styles.previewCard} style={{
                        background: selectedProject.preview_data_parsed.theme?.background || "rgba(255, 255, 255, 0.02)",
                      }}>
                        <div className={styles.previewHeader}>
                          <h4 className={styles.previewTitle}>{selectedProject.title}</h4>
                          <span className={styles.previewLiveBadge}>Live</span>
                        </div>

                        {selectedProject.preview_data_parsed.components?.map((component, idx) => {
                          if (component.type === "stat_card") {
                            return (
                              <div key={idx} className={styles.componentCard}>
                                <p className={styles.componentLabel}>{component.title}</p>
                                <h5 className={styles.componentValue}>{component.value}</h5>
                                <span className={styles.componentChange} style={{
                                  color: component.trend === "up" ? "#10b981" : "#ef4444"
                                }}>
                                  {component.change}
                                </span>
                              </div>
                            );
                          } else if (component.type === "chart") {
                            return (
                              <div key={idx} className={styles.componentCard}>
                                <p className={styles.componentLabel}>{component.title}</p>
                                <div className={styles.chartRow}>
                                  {component.data.map((val, cIdx) => (
                                    <div key={cIdx} className={styles.chartBarInner} style={{
                                      height: `${val}%`,
                                      background: `linear-gradient(180deg, ${selectedProject.preview_data_parsed.theme?.primary || "var(--color-primary)"}, rgba(255,255,255,0.02))`,
                                    }}></div>
                                  ))}
                                </div>
                              </div>
                            );
                          } else if (component.type === "list") {
                            return (
                              <div key={idx} className={styles.componentCard}>
                                <p className={styles.componentLabel}>{component.title}</p>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                  {component.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className={styles.listItem}>
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

                {/* Right Column: Specifications Panel */}
                <div className={styles.analysisColumn}>
                  <div className={styles.specsPanel}>
                    <div>
                      <span className={styles.specsSectionLabel}>Mockup Breakdown</span>
                      <h3 className={styles.specsSectionTitle}>System Specifications</h3>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div className={styles.specsRow}>
                        <span className={styles.specsLabel}>Blueprint Title</span>
                        <span className={styles.specsValue}>{selectedProject.title}</span>
                      </div>
                      <div className={styles.specsRow}>
                        <span className={styles.specsLabel}>Sync Category</span>
                        <span className={styles.specsValue}>{selectedProject.category}</span>
                      </div>
                      <div className={styles.specsRow}>
                        <span className={styles.specsLabel}>Creation Timestamp</span>
                        <span className={styles.specsValue}>{formatDate(selectedProject.created_at)}</span>
                      </div>
                      <div className={styles.specsPromptBlock}>
                        <span className={styles.specsLabel}>AI Prompter Context</span>
                        <blockquote className={styles.specsBlockquote}>
                          &ldquo;{selectedProject.prompt}&rdquo;
                        </blockquote>
                      </div>
                    </div>

                    <div className={styles.specsActions}>
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
        <div className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
