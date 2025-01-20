import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { CarouselItem, IErrorResponse } from "@/lib/types";
import getBackendUrl from "@/lib/get-backend-url";

interface CarouselStore {
    items: CarouselItem[];
    isLoading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
}
const backendUrl = await getBackendUrl();
const useUserCarouselStore = create<CarouselStore>((set, get) => ({
    items: [],
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null, items: [] });
        try {
            const response = await axios.get(`${backendUrl}/api/carousel/all`);
            set({ items: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                items: [],
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    }
}));

export default useUserCarouselStore;
