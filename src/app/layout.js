import NavbarWrapper from "@/components/NavbarWrapper";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export const metadata = {
  title: "DBA Conference 2026",
  description: "International Conference on Building Resilient Supply Chains",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#003366", // Navy Blue
                color: "#fff",
                borderRadius: "16px", // Softer corners for premium feel
                fontSize: "12px",
                fontWeight: "bold",
                border: "1px solid #C5A059", // Gold Border
                padding: "12px 24px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
              },
              success: {
                iconTheme: {
                  primary: "#C5A059", // Gold Icon
                  secondary: "#003366", // Navy Background for icon
                },
              },
              error: {
                style: {
                  background: "#fff",
                  color: "#7f1d1d",
                  border: "1px solid #fecaca",
                },
                iconTheme: {
                  primary: "#7f1d1d",
                  secondary: "#fff",
                },
              },
            }}
          />

          <NavbarWrapper />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
