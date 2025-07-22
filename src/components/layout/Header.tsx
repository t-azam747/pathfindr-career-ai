import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ui/theme-toggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="p-2" />

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-smooth">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
            PathfindrAI
          </span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;