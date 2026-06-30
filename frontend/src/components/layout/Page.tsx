import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

type SiteLayoutProps = {
  children: ReactNode;
};

export function Page({ children }: SiteLayoutProps) {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Nav />

      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}