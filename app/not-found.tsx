import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <body
        style={{
          background: "#111827",
          color: "#F1F5F9",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <p
            style={{
              fontSize: "5rem",
              fontWeight: 300,
              color: "#D4A843",
              marginBottom: "0.5rem",
              lineHeight: 1,
            }}
          >
            404
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#94A3B8",
              marginBottom: "2rem",
            }}
          >
            This page doesn&rsquo;t exist.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "0.625rem 1.5rem",
              borderRadius: "9999px",
              background: "#D4A843",
              color: "#111827",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
