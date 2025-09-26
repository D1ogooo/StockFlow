import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Filter,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Admin/AdminNavbar";
import { useItems } from "@/contexts/ItemsContext";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrioridade, setFilterPrioridade] = useState<string>("todos");
  const [filterSituacao, setFilterSituacao] = useState<string>("todos");

  // --- Filtros ---
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.titulo
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrioridade =
        filterPrioridade === "todos" || item.prioridade === filterPrioridade;
      const matchesSituacao =
        filterSituacao === "todos" || item.situacao === filterSituacao;

      return matchesSearch && matchesPrioridade && matchesSituacao;
    });
  }, [items, searchTerm, filterPrioridade, filterSituacao]);

  // --- Estatísticas ---
  const stats = useMemo(() => {
    const total = items.length;
    const emFalta = items.filter((i) => i.situacao === "em-falta").length;
    const emDia = items.filter((i) => i.situacao === "em-dia").length;
    const altaPrioridade = items.filter((i) => i.prioridade === "alta").length;
    const quantidadeTotal = items.reduce((sum, i) => sum + i.quantidade, 0);

    return { total, emFalta, emDia, altaPrioridade, quantidadeTotal };
  }, [items]);

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-[#C13839] text-[#fff] pl-2 pr-2 rounded-[10px]";
      case "media":
        return "bg-[#5822B1] text-[#fff] pl-2 pr-2 rounded-[10px]";
      case "baixa":
        return "bg-[#212125] text-[#fff] pl-2 pr-2 rounded-[10px]";
      default:
        return "";
    }
  };

  const getPriorityIcon = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <AlertTriangle className="h-4 w-4" />;
      case "media":
        return <BarChart3 className="h-4 w-4" />;
      case "baixa":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  // --- EXPORTAR PARA PDF ---
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Itens", 14, 20);

    const head = [["Título", "Quantidade", "Situação", "Prioridade", "Criado em"]];
    const body = filteredItems.map((item) => [
      item.titulo,
      item.quantidade.toString(),
      item.situacao === "em-dia" ? "Em Dia" : "Em Falta",
      item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1),
      new Date(item.createdAt).toLocaleDateString("pt-BR"),
    ]);

    autoTable(doc, {
      startY: 30,
      head,
      body,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
    });

    doc.save("relatorio-itens.pdf");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Título */}
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
              <div className="text-2xl font-bold text-destructive">
                {stats.altaPrioridade}
              </div>
              <div className="text-sm text-muted-foreground">Alta Prioridade</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary-glow" />
              <div className="text-2xl font-bold text-primary-glow">
                {stats.quantidadeTotal}
              </div>
              <div className="text-sm text-muted-foreground">
                Quantidade total de cada item
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-gradient-card border-border shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 justify-between">
              <div className="flex items-center justify-center gap-2">
                <Filter className="h-5 w-5" />
                <span>Filtros e Busca</span>
              </div>
              <Button variant="secondary" className="ml-auto" onClick={exportToPDF}>
                Exportar para PDF
              </Button>
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
                <Select
                  value={filterPrioridade}
                  onValueChange={setFilterPrioridade}
                >
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
        <Card className="bg-gradient-card border-border shadow-card py-5">
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">
                  {items.length === 0
                    ? "Nenhum item cadastrado ainda"
                    : "Nenhum item encontrado"}
                </p>
                <p className="text-sm">
                  {items.length === 0
                    ? "Acesse a página de administração para começar a cadastrar itens"
                    : "Tente ajustar os filtros de busca"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 max-h-[430px] overflow-y-auto">
                {filteredItems.map((item, index) => (
                  <div
                    key={item._id}
                    className="p-6 bg-background/30 rounded-lg border border-border"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold">{item.titulo}</h3>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            {getPriorityIcon(item.prioridade)}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Quantidade: {item.quantidade}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <p
                            className={
                              item.situacao === "em-dia"
                                ? "text-success"
                                : "text-yellow-500"
                            }
                          >
                            {item.situacao === "em-dia" ? "Em Dia" : "Em Falta"}
                          </p>

                          <p className={getPriorityColor(item.prioridade)}>
                            {item.prioridade === "alta"
                              ? "Prioridade alta"
                              : item.prioridade === "media"
                              ? "Prioridade média"
                              : "Prioridade baixa"}
                          </p>
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
