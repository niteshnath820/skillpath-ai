import "./globals.css";

export const metadata = {
  title: "SkillPath AI — Personalized Career Readiness Engine",
  description:
    "AI-powered skill-gap analysis and personalized learning roadmaps for students. Built for Orvix Hackathon 2026 by Team LegacyBuilders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
    }
