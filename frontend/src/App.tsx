import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ItemsProvider } from "./contexts/ItemsContext";
import { Router } from "./routes";

const App = () => (
    <ItemsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router />
      </TooltipProvider>
    </ItemsProvider>
);

export default App;
