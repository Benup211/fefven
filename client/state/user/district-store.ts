import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

export interface DistrictMember {
    id: number;
    name: string;
    imageUrl: string;
    contactNo: string;
    designation: string;
    designationPriority: number;
    district: string;
}

interface DistrictStore {
    members: DistrictMember[];
    isLoading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
}

const backendUrl = await getBackendUrl();
const useUserDistrictStore = create<DistrictStore>((set) => ({
    members: [],
    isLoading: false,
    error: null,

    fetchMembers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${backendUrl}/api/district-member/all/user`
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

export default useUserDistrictStore;
