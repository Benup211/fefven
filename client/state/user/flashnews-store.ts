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
    items: FlashNewsItem| null;
    isLoading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
}
const backendUrl = await getBackendUrl();
const useUserFlashNewsStore = create<FlashNewsStore>((set) => ({
    items: null,
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${backendUrl}/api/flash-news/first`);
            set({ items: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                items: null,
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    }
}));

export default useUserFlashNewsStore;
