import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glamour Pets | Grooming Salon in Amsterdam",
  description: "Pamper your furry friend at our Amsterdam dog grooming salon. We offer high-quality treatments with the best products. Discover us now!",
  openGraph: {
    description: "Pamper your furry friend at our Amsterdam dog grooming salon. We offer high-quality treatments with the best products. Discover us now!",
  },
  icons: {
    icon: [
      { url: "https://glamourpets.nl/wp-content/uploads/2023/03/cropped-favicon-32x32.png", sizes: "32x32" },
      { url: "https://glamourpets.nl/wp-content/uploads/2023/03/cropped-favicon-192x192.png", sizes: "192x192" },
    ],
    apple: [
      { url: "https://glamourpets.nl/wp-content/uploads/2023/03/cropped-favicon-180x180.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
