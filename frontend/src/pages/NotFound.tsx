import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-primary mx-auto mb-4 animate-float" />
          <h1 className="text-6xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! A página que você procura não foi encontrada
          </p>
        </div>
        
        <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Voltar ao Início</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
