import "./globals.css";

export const metadata = {
  title: "Halesi Ravintola",
  description: "Nepalese restaurant in the heart of Hyvinkaa with online reservations."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
