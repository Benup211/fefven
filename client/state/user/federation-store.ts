import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";
import type { Member } from "@/lib/types";

interface FederationMembersState {
    presentMembers: Member[];
    pastMembers: Member[];
    isLoading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
}

const backendUrl = await getBackendUrl();
export const useUserFederationMembersStore = create<FederationMembersState>(
    (set) => ({
        presentMembers: [],
        pastMembers: [],
        isLoading: false,
        error: null,
        fetchMembers: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axios.get(
                    `${backendUrl}/api/federation-member/all/user`
                );
                set({
                    presentMembers: response.data.presentMember,
                    pastMembers: response.data.pastMember,
                    isLoading: false,
                });
            } catch (error) {
                const { response } = error as AxiosError<IErrorResponse>;
                set({
                    error:
                        response?.data.errorMessage ??
                        "Server is not connected",
                    isLoading: false,
                });
            }
        },
    })
);
