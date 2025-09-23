import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, AlertTriangle, CheckCircle, Filter, TrendingUp, BarChart3, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useItems } from "@/contexts/ItemsContext";
import { useState, useMemo } from "react";

const Dashboard = () => {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrioridade, setFilterPrioridade] = useState<string>("todos");
  const [filterSituacao, setFilterSituacao] = useState<string>("todos");

  // Filtros e busca
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrioridade = filterPrioridade === "todos" || item.prioridade === filterPrioridade;
      const matchesSituacao = filterSituacao === "todos" || item.situacao === filterSituacao;
      
      return matchesSearch && matchesPrioridade && matchesSituacao;
    });
  }, [items, searchTerm, filterPrioridade, filterSituacao]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = items.length;
    const emFalta = items.filter(item => item.situacao === "em-falta").length;
    const emDia = items.filter(item => item.situacao === "em-dia").length;
    const altaPrioridade = items.filter(item => item.prioridade === "alta").length;
    const quantidadeTotal = items.reduce((sum, item) => sum + item.quantidade, 0);

    return { total, emFalta, emDia, altaPrioridade, quantidadeTotal };
  }, [items]);

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta": return "destructive";
      case "media": return "default";
      case "baixa": return "secondary";
      default: return "default";
    }
  };

  const getSituacaoColor = (situacao: string) => {
    return situacao === "em-dia" ? "success" : "warning";
  };

  const getPriorityIcon = (prioridade: string) => {
    switch (prioridade) {
      case "alta": return <AlertTriangle className="h-4 w-4" />;
      case "media": return <BarChart3 className="h-4 w-4" />;
      case "baixa": return <TrendingUp className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            Dashboard de Estoque
          </h1>
          <p className="text-xl text-muted-foreground">
            Visualize e monitore todos os seus itens em tempo real
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total de Itens</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-success">{stats.emDia}</div>
              <div className="text-sm text-muted-foreground">Em Dia</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-warning">{stats.emFalta}</div>
              <div className="text-sm text-muted-foreground">Em Falta</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
              <div className="text-2xl font-bold text-destructive">{stats.altaPrioridade}</div>
              <div className="text-sm text-muted-foreground">Alta Prioridade</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary-glow" />
              <div className="text-2xl font-bold text-primary-glow">{stats.quantidadeTotal}</div>
              <div className="text-sm text-muted-foreground">Quantidade Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-gradient-card border-border shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros e Busca</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Filtrar por prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as Prioridades</SelectItem>
                    <SelectItem value="alta">Alta Prioridade</SelectItem>
                    <SelectItem value="media">Média Prioridade</SelectItem>
                    <SelectItem value="baixa">Baixa Prioridade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterSituacao} onValueChange={setFilterSituacao}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Filtrar por situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as Situações</SelectItem>
                    <SelectItem value="em-dia">Em Dia</SelectItem>
                    <SelectItem value="em-falta">Em Falta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Itens */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Itens ({filteredItems.length})</span>
            </CardTitle>
            <CardDescription>
              {filteredItems.length === 0 && items.length > 0 
                ? "Nenhum item encontrado com os filtros aplicados" 
                : "Lista completa de itens cadastrados"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">
                  {items.length === 0 ? "Nenhum item cadastrado ainda" : "Nenhum item encontrado"}
                </p>
                <p className="text-sm">
                  {items.length === 0 
                    ? "Acesse a página de administração para começar a cadastrar itens" 
                    : "Tente ajustar os filtros de busca"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-6 bg-background/30 rounded-lg border border-border hover:bg-background/50 transition-all duration-300 hover-scale animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold">{item.nome}</h3>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            {getPriorityIcon(item.prioridade)}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Quantidade: {item.quantidade}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant={getPriorityColor(item.prioridade) as any}>
                            Prioridade: {item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1)}
                          </Badge>
                          <Badge 
                            variant={getSituacaoColor(item.situacao) as any}
                            className={item.situacao === "em-dia" ? "bg-success text-white" : "bg-warning text-black"}
                          >
                            {item.situacao === "em-dia" ? "Em Dia" : "Em Falta"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;