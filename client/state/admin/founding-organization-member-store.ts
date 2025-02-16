import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

interface FoundingMember {
    id: number;
    name: string;
    contactNo: string;
    designation: string;
    designationPriority: number;
    organizationId: number;
}

interface FoundingMemberStore {
    members: FoundingMember[];
    Loading: boolean;
    error: string | null;
    fetchMembers: (organizationId: number) => Promise<void>;
    createMember: (member: Omit<FoundingMember, "id">) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteMember: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
}

const backendUrl = await getBackendUrl();
export const useFoundingOrganizationMemberStore = create<FoundingMemberStore>((set) => ({
    members: [],
    Loading: false,
    error: null,
    fetchMembers: async (organizationId: number) => {
        set({ Loading: true });
        try {
            const response = await axios.get(
                `${backendUrl}/api/foundary-organization-member/all/${organizationId}`
            );
            set({ members: response.data, Loading: false, error: null });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                Loading: false,
            });
        }
    },
    createMember: async(newMember) => {
        set({ Loading: true });
        try {
            const response = await axios.post(
                `${backendUrl}/api/foundary-organization-member/create`,
                newMember
            );
            set((state) => ({
                members: [...state.members, response.data],
                Loading: false,
                error: null,
            }));
            return { success: true, error: null };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({ Loading: false });
            return {
                success: false,
                error: response?.data.errorMessage ?? "Server is not connected",
            };
        }
    },
    deleteMember: async(id: number) => {
        set({ Loading: true });
        try {
            await axios.delete(
                `${backendUrl}/api/foundary-organization-member/delete/${id}`
            );
            set((state) => ({
                members: state.members.filter((member) => member.id !== id),
                Loading: false,
                error: null,
            }));
            return { success: true, error: null };
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({ Loading: false });
            return {
                success: false,
                error: response?.data.errorMessage ?? "Server is not connected",
            };
        }
    },
}));