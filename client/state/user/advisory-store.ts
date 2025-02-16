import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

export interface AdvisoryMember {
    id: number;
    name: string;
    imageUrl: string;
    contactNo: string;
    designation: string;
    designationPriority: number;
}

interface AdvisoryStore {
    members: AdvisoryMember[];
    isLoading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
}

const backendUrl = await getBackendUrl();
const useUserAdvisoryStore = create<AdvisoryStore>((set) => ({
    members: [],
    isLoading: false,
    error: null,

    fetchMembers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${backendUrl}/api/advisory-member/all/user`
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

export default useUserAdvisoryStore;
