import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Footer , Navbar} from "@/components";

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
        <Navbar />
         <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}
