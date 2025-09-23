import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Package, BarChart3, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: Package,
      title: "Controle Total",
      description: "Gerencie seu estoque com facilidade e precisão"
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Acompanhe estatísticas e dados importantes"
    },
    {
      icon: Shield,
      title: "Seguro",
      description: "Seus dados protegidos com segurança máxima"
    },
    {
      icon: Zap,
      title: "Rápido",
      description: "Interface otimizada para máxima produtividade"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-glow">
              StockFlow
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A solução completa para controle de estoque e inventário. 
              Gerencie seus itens com prioridade e situação em tempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 animate-float"
              >
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <span>Ver Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-primary/20 hover:bg-primary/10"
              >
                <Link to="/admin">Administrar</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para manter seu estoque organizado e eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 group"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-card border-border shadow-card max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Pronto para começar?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Acesse o painel de administração e comece a gerenciar seu estoque hoje mesmo
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Ver Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              StockFlow
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 StockFlow. Controle de estoque inteligente.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;