import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { CarouselItem, IErrorResponse, NewCarouselItem } from "@/lib/types";
import getBackendUrl from "@/lib/get-backend-url";

interface CarouselStore {
    items: CarouselItem[];
    searchTerm: string;
    isLoading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
    addItem: (newItem: NewCarouselItem) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteItem: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    setSearchTerm: (term: string) => void;
}
const backendUrl = await getBackendUrl();
const useCarouselStore = create<CarouselStore>((set, get) => ({
    items: [],
    searchTerm: "",
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${backendUrl}/api/carousel/all`);
            set({ items: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },

    addItem: async (newItem: NewCarouselItem) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("title", newItem.title);
            formData.append("description", newItem.description);
            if (newItem.file) {
                formData.append("file", newItem.file);
            }

            const response = await axios.post(
                `${backendUrl}/api/carousel/create`,
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
            await axios.delete(`${backendUrl}/api/carousel/delete/${id}`);
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

export default useCarouselStore;
