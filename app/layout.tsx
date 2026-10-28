import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusFind — Lost & Found, Together",
  description:
    "A student-built campus lost-and-found platform to help belongings find their way home.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
