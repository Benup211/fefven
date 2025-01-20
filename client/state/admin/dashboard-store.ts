import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";
interface DashboardProps {
    resource: Number;
    events: Number;
    gallery: Number;
    news: Number;
    carousel: Number;
}

interface DashboardStore {
    cards: DashboardProps;
    fetchDataCount: () => Promise<{
        success: boolean;
    }>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useDashboardStore = create<DashboardStore>((set) => ({
    cards: {
        resource: 0,
        events: 0,
        gallery: 0,
        news: 0,
        carousel: 0,
    },
    isLoading: false,
    error: null,
    fetchDataCount: async () => {
        set({ isLoading: true,error:null });
        try {
            const response = await axios.get(`${backendUrl}/api/dashboard/all`);
            set({ cards: response.data, isLoading: false,error:null });
            return { success: true };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                isLoading: false,
                error: response?.data.errorMessage ?? "Server is not connected"
            });
            return { success: false };
        }
    },
}));

export default useDashboardStore;
