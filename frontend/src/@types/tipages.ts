import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface Note {
  _id: string;
  conteudo: string;
  image: string;
  link: string;
  title: string;
}

export interface AuthContextType {
  register: (nome: string, email: string, password: string) => void;
  login: (email: string, password: string) => Promise<void>;
  loggout: () => void
  user?: {
    id: string;
    email: string;
  };
  token?: string;
}

export interface AuthData {
  user?: {
    id: string;
    email: string;
  };
  token?: string;
}

export interface AlertType {
 title: string;
 description: string;
 status: "success" | "error" | "warning" | "info";
}