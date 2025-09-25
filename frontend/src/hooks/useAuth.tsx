import { useState, useEffect, createContext, useContext } from "react";
import type { AuthContextType, AuthData, AuthProviderProps } from "../@types/tipages";
import { api } from "../services/api";
// import type { AxiosError } from "axios";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthData>({});

    useEffect(() => {
        const user = localStorage.getItem("@StockFlow:user");
        const token = localStorage.getItem("@StockFlow:token");
    

        if (user && token) {
            setData({ user: JSON.parse(user), token });
            api.defaults.headers.authorization = `Bearer ${token}`;
        }
    }, []);

    async function register(nome: string, email: string, password: string) {
        try {
            await api.post('/users/create', { nome, email, password });
        } catch (error: any) {
            const msg = error?.response?.data?.message || 'Erro ao registrar usuário';
            throw new Error(msg);
        }
    }

    async function login(email: string, password: string) {
        try {
            const res = await api.post("/users/auth", { email, password });
            const { user, token } = res.data;

            localStorage.setItem("@StockFlow:user", JSON.stringify(user));
            localStorage.setItem("@StockFlow:token", token);

            api.defaults.headers.authorization = `Bearer ${token}`;
            setData({ user, token });
        } catch (error: any) {
            const msg = error?.response?.data?.message || 'Não foi possível logar';
            throw new Error(msg);
        }
    }


    async function loggout() {
        localStorage.removeItem("@StockFlow:user");
        localStorage.removeItem("@StockFlow:token");
        localStorage.removeItem("stockflow-items");
        api.defaults.headers.authorization = '';
        setData({});
    }

    return (
        <AuthContext.Provider value={{ register, login, user: data.user, token: data.token, loggout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('Falha ao usar contexto');
    }
    return context;
}

export { AuthProvider, useAuth };