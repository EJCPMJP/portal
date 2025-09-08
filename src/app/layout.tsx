import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export const metadata = { title: "Portal", description: "" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.classList.add("dark");if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}})();',
          }}
        />
      </head>
      <body className="font-sans">
        <Header />
        <main className="container py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
