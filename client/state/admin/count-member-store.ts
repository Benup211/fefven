import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";
interface MemberProps {
    federation: Number;
    province: Number;
    district: Number;
}

interface CountMemberStore {
    cards: MemberProps;
    fetchDataCount: () => Promise<{
        success: boolean;
    }>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useCountMemberStore = create<CountMemberStore>((set) => ({
    cards: {
        federation: 0,
        province: 0,
        district: 0,
    },
    isLoading: false,
    error: null,
    fetchDataCount: async () => {
        set({ isLoading: true,error:null });
        try {
            const response = await axios.get(`${backendUrl}/api/member/all`);
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

export default useCountMemberStore;
