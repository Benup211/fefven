import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

interface Member {
    id: number;
    name: string;
    imageUrl: string;
    contactNo: string;
    designation: string;
    designationPriority: number;
    province: number;
}

interface ProvinceStore {
    members: Member[];
    isLoading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
}

const backendUrl = await getBackendUrl();
const useUserProvinceStore = create<ProvinceStore>((set) => ({
    members: [],
    isLoading: false,
    error: null,

    fetchMembers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${backendUrl}/api/province-member/all/user`
            );
            set({ members: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
}));

export default useUserProvinceStore;
