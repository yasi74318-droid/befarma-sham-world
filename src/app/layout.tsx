import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
const vazirmatn = Vazirmatn({ subsets: ["arabic"], weight: ["400", "600", "700", "800"] });
export const metadata: Metadata = {
  title: "جهان بفرمایید شام آنلاین | BEFARMA SHAM WORLD",
  description: "شبیه‌سازی آنلاین و سه‌بعدی برنامه بفرمایید شام",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>{children}</body>
    </html>
  );
}