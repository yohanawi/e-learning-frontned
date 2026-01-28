'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, api } from '@/lib/api';

const AUTH_TOKEN_KEY = 'auth_token';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string, remember?: boolean) => Promise<void>;
    register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore token on mount:
        // - localStorage: "Remember me" (persists after closing the browser)
        // - sessionStorage: session-only (clears when tab/window closes)
        const storedToken =
            localStorage.getItem(AUTH_TOKEN_KEY) ||
            sessionStorage.getItem(AUTH_TOKEN_KEY);

        if (storedToken) {
            setToken(storedToken);
            fetchUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const persistToken = (authToken: string, remember: boolean) => {
        if (remember) {
            localStorage.setItem(AUTH_TOKEN_KEY, authToken);
            sessionStorage.removeItem(AUTH_TOKEN_KEY);
        } else {
            sessionStorage.setItem(AUTH_TOKEN_KEY, authToken);
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }
    };

    const clearPersistedToken = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
    };

    const fetchUser = async (authToken: string) => {
        try {
            const response = await api.auth.me(authToken);
            setUser(response.data);
        } catch (error) {
            // Token invalid, clear it
            clearPersistedToken();
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, remember: boolean = false) => {
        const response = await api.auth.login({ email, password });
        const { user: userData, token: authToken } = response.data;

        setUser(userData);
        setToken(authToken);
        persistToken(authToken, remember);
    };

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        const response = await api.auth.register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
        const { user: userData, token: authToken } = response.data;

        setUser(userData);
        setToken(authToken);
        // Default registration to a session-only login.
        // If you want "remember me" on register too, we can add a checkbox.
        persistToken(authToken, false);
    };

    const logout = async () => {
        if (token) {
            try {
                await api.auth.logout(token);
            } catch (error) {
                // Ignore errors on logout
            }
        }

        setUser(null);
        setToken(null);
        clearPersistedToken();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
