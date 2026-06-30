import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

type SiteLayoutProps = {
  children: ReactNode;
};

export function Page({ children }: SiteLayoutProps) {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="container-fluid bg-primary">
        <Nav />
      </nav>
      <main className="container-xl py-5">
        {children}
      </main>
      <footer className="container-fluid bg-primary">
        <Footer />
      </footer>
    </div>
  );
}