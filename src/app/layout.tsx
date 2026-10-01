import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capstone App",
  description: "AI-assisted translation capstone",
};

const links = [
  { href: "/", label: "Home" },
  { href: "/translate", label: "Translate" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
  { href: "/health", label: "Health" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <nav className="flex flex-wrap gap-4 border-b border-black/10 p-4 dark:border-white/10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-medium hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
