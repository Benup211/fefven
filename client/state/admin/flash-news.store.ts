import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "@/lib/types";
import getBackendUrl from "@/lib/get-backend-url";

export interface FlashNewsItem {
    id: number
    title: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}

interface FlashNewsStore {
    items: FlashNewsItem[];
    isLoading: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    error: string | null;
    fetchItems: () => Promise<void>;
    addItem: (newItem: {
        title: string
        file: File | null
      }) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteItem: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
}
const backendUrl = await getBackendUrl();
const useFlashNewsStore = create<FlashNewsStore>((set,get) => ({
    items: [],
    isLoading: false,
    error: null,
    searchTerm: "",

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${backendUrl}/api/flash-news/all`);
            set({ items: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                items: [],
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
    addItem: async (newItem) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("title", newItem.title);
            if (newItem.file) {
                formData.append("file", newItem.file);
            }
            const response = await axios.post(
                `${backendUrl}/api/flash-news/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const { items } = get();
            set({
                items: [...items, response.data],
                isLoading: false,
            });
            return { success: true,error: null };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                isLoading: false,
            });
            return { success: false,error: response?.data.errorMessage ?? "Server is not connected"};
        }
    },

    deleteItem: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${backendUrl}/api/flash-news/delete/${id}`);
            const { items } = get();
            set({
                items: items.filter((item) => item.id !== id),
                isLoading: false,
            });
            return { success: true,error: null };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                isLoading: false,
            });
            return { success: false,error: response?.data.errorMessage ?? "Server is not connected" };
        }
    },
    setSearchTerm: (term: string) => set({ searchTerm: term }),
}));

export default useFlashNewsStore;
