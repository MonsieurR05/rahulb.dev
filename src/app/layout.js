import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Rahul Bagga is a Computer Science student and software developer in Southampton, building full-stack web apps with React, Next.js and Python.";

export const metadata = {
  metadataBase: new URL("https://www.rahulb.dev"),
  title: "Rahul Bagga — Software Developer",
  description,
  openGraph: {
    title: "Rahul Bagga — Software Developer",
    description,
    url: "/",
    siteName: "Rahul Bagga",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
