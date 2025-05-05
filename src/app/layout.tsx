import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Sora, IBM_Plex_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import { Providers } from "@/_core/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin']
});

const sora = Sora({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  subsets: ["latin"]
});
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  subsets: ["latin"]
});
const orbitron = Orbitron({
  weight: ['400', '500', '600', '700'],
  variable: '--font-orbitron',
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  icons: {
    icon: '/logo_dark.png'
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${sora.variable} ${ibmPlexSans.variable} ${orbitron.variable}`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
