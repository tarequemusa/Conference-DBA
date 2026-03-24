import NavbarWrapper from "@/components/NavbarWrapper"; // Import the new wrapper
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export const metadata = {
  title: "ICEBTM 2025 - EWU Conference",
  description:
    "International Conference on Economics, Business and Technology Management 2026",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#003366",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#C5A059",
                  secondary: "#fff",
                },
              },
            }}
          />

          {/* This wrapper handles the hiding logic automatically */}
          <NavbarWrapper />

          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
