import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gurme Planı — Haftalık Yemek Planlama",
  description: "Haftanızı lezzetli tariflerle planlayın, alışveriş listelerinizi otomatik oluşturun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
      style={{ colorScheme: "light", backgroundColor: "#FDFAF6" }}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "#FDFAF6", color: "#1C1612" }}>{children}</body>
    </html>
  );
}
