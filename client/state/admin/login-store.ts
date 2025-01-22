import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

interface AuthStore {
    login: (
        username: string,
        password: string
    ) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    logout: (
    ) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    isLoading: boolean;
}

const backendUrl = await getBackendUrl();

const useAuthStore = create<AuthStore>((set) => ({
    isLoading: false,
    login: async (username, password) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                `${backendUrl}/api/user/login`,
                {
                    username,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            set({ isLoading: false });
            return {
                success: true,
                error: null,
            };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                isLoading: false,
            });
            return {
                success: false,
                error: response?.data.errorMessage ?? "Server is not connected",
            };
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${backendUrl}/api/user/logout`, {
                withCredentials: true,
            });
            set({ isLoading: false });
            return {
                success: true,
                error: null,
            };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                isLoading: false,
            });
            return {
                success: false,
                error: response?.data.errorMessage ?? "Server is not connected",
            };
        }
    },
}));

export default useAuthStore;
