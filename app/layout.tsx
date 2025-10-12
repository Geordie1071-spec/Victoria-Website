import type { Metadata } from "next";
import { Open_Sans, Lora } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});
export const metadata: Metadata = {
  title: "Victoria Gozo",
  description: "Explore the beauty and history of Victoria, Gozo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
