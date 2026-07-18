import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Closet Stilus | Moda Feminina Premium",
  description:
    "Moda feminina que valoriza você. Lingerie, baby dolls, biquínis, cosméticos e calçados com elegância e sofisticação. Entrega para todo Brasil.",
  keywords: [
    "moda feminina",
    "lingerie",
    "baby doll",
    "biquíni",
    "cosméticos",
    "calçados femininos",
    "closet stilus",
    "moda íntima",
    "elegância",
    "sofisticação",
  ],
  openGraph: {
    title: "Closet Stilus | Moda Feminina Premium",
    description:
      "Moda feminina que valoriza você. Elegância, sofisticação e autoestima.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
