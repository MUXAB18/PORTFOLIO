import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat"
});

export const metadata: Metadata = {
  title: "Musab Iftikhar | Full Stack Developer",
  description: "I'm a passionate Full Stack Developer from Lahore, Pakistan, with strong expertise in React, Next.js, Node.js, and PostgreSQL.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Musab Iftikhar",
  "url": "https://portfolio-rouge-kappa-97.vercel.app",
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Vyntech Solutions"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lahore",
    "addressCountry": "Pakistan"
  },
  "sameAs": [
    "https://github.com/MUXAB18",
    "https://www.linkedin.com/in/musab-iftikhar-94668a330"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${poppins.variable} ${caveat.variable} font-sans antialiased bg-[#1A1D29] text-white overflow-x-hidden selection:bg-[#5EC9A8] selection:text-[#1A1D29]`}>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
