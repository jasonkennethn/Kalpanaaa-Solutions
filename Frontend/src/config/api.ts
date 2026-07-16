export const API_BASE_URL =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("localhost") || window.location.hostname.includes("127.0.0.1"))
    ? "http://localhost:8000"
    : "https://solutionsme.pythonanywhere.com";
