import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"; // Using Geist + Instrument Serif
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Amdahl | AI-Native Strategy Workflows",
  description: "Auditable, high-precision strategy workflows for government.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>

    </html>
  );
}
