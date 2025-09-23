import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useItems } from "@/contexts/ItemsContext";
import Navbar from "@/components/Navbar";

const Admin = () => {
  const { items, addItem, removeItem } = useItems();
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [prioridade, setPrioridade] = useState<"baixa" | "media" | "alta">("media");
  const [situacao, setSituacao] = useState<"em-dia" | "em-falta">("em-dia");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !quantidade) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    addItem({
      nome,
      quantidade: parseInt(quantidade),
      prioridade,
      situacao,
    });

    setNome("");
    setQuantidade("");
    setPrioridade("media");
    setSituacao("em-dia");

    toast({
      title: "Sucesso",
      description: "Item adicionado com sucesso!",
    });
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item removido",
      description: "O item foi removido da lista",
    });
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Painel de Administração
          </h1>
          <p className="text-xl text-muted-foreground">
            Gerencie seu estoque de forma eficiente
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Adicionar Item</span>
              </CardTitle>
              <CardDescription>
                Cadastre novos itens no sistema de controle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Item</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome do item"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prioridade</Label>
                  <Select value={prioridade} onValueChange={(value: "baixa" | "media" | "alta") => setPrioridade(value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Situação</Label>
                  <Select value={situacao} onValueChange={(value: "em-dia" | "em-falta") => setSituacao(value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em-dia">Em Dia</SelectItem>
                      <SelectItem value="em-falta">Em Falta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de itens */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Itens Cadastrados ({items.length})</span>
              </CardTitle>
              <CardDescription>
                Lista de todos os itens no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum item cadastrado ainda</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-background/30 rounded-lg border border-border hover:bg-background/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">{item.nome}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">
                              Qtd: {item.quantidade}
                            </Badge>
                            <Badge variant={getPriorityColor(item.prioridade) as any}>
                              {item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1)}
                            </Badge>
                            <Badge 
                              variant={getSituacaoColor(item.situacao) as any}
                              className={item.situacao === "em-dia" ? "bg-success text-white" : "bg-warning text-black"}
                            >
                              {item.situacao === "em-dia" ? "Em Dia" : "Em Falta"}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;