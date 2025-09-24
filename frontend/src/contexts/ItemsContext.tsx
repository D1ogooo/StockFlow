import axios from 'axios'
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Item {
  id: string;
  titulo: string;
  quantidade: number;
  prioridade: "baixa" | "media" | "alta";
  situacao: "em-dia" | "em-falta";
  criadoEm: string;
}

interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, "id" | "criadoEm">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
}


const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/stock/show')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens:", error);
      });
  })

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedItems = localStorage.getItem("stockflow-items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Salvar no localStorage sempre que items mudar
  useEffect(() => {
    localStorage.setItem("stockflow-items", JSON.stringify(items));
  }, [items]);

  const addItem = (itemData: Omit<Item, "id" | "criadoEm">) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      criadoEm: new Date().toISOString(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </ItemsContext.Provider>
  );
};