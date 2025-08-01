import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen gradient-surface">
      <Header />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;