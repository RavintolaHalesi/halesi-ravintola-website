import "./globals.css";

const googleTagId = "G-F877GL8V0N";

export const metadata = {
  title: "Halesi Ravintola",
  description: "Nepalese restaurant in the heart of Hyvinkaa with online reservations."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src={"https://www.googletagmanager.com/gtag/js?id=" + googleTagId} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());
              gtag("config", "G-F877GL8V0N");
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
