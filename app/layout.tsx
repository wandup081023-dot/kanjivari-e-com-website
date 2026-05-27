import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Kanjivaram — Fine Indian Jewelry | Handcrafted Jhumkas",
    template: "%s | Kanjivaram Fine Jewelry",
  },
  description:
    "Discover exquisite handcrafted jhumka earrings from Kanjivaram — India's premier luxury jewelry brand. From bridal to everyday elegance, each piece is a masterpiece of Indian craftsmanship.",
  keywords: ["jhumka", "Indian jewelry", "handcrafted", "bridal jewelry", "ethnic earrings", "luxury jewelry"],
  openGraph: {
    title: "Kanjivaram — Fine Indian Jewelry",
    description: "Handcrafted Elegance for Every Occasion",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400..900&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <CartDrawer />
      </body>
    </html>
  );
}
