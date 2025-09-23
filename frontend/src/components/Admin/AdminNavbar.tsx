import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Settings, BarChart } from "lucide-react";

const Navbar = () => {
  // const {} = useAuth();
  const user = true;
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            StockFlow
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            asChild
            variant={location.pathname === "/dashboard" ? "default" : "ghost"}
            size="sm"
          >
            <Link to="/dashboard" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button
            asChild
            variant={location.pathname === "/admin" ? "default" : "ghost"}
            size="sm"
          >
            <Link to="/" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Administração</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;