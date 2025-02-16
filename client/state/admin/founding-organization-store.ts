import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

interface FoundingOrganization {
    id: number;
    name: string;
    establishedAt: string;
}

interface FoundingOrganizationStore {
    organizations: FoundingOrganization[];
    Loading: boolean;
    error: string | null;
    fetchOrganizations: () => Promise<void>;
    createOrganization: (name: string, establishedAt: string) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteOrganization: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
}
const backendUrl = await getBackendUrl();
export const useFoundingOrganizationStore = create<FoundingOrganizationStore>((set) => ({
    organizations: [],
    Loading: false,
    error: null,
    fetchOrganizations: async () => {
        set({ Loading: true });
        try {
            const response = await axios.get(
                `${backendUrl}/api/foundary-organization/all`
            );
            set({ organizations: response.data, Loading: false, error: null });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                Loading: false,
            });
        }
    },
    createOrganization: async(name, establishedAt) => {
        set({ Loading: true });
        try {
            const response = await axios.post(
                `${backendUrl}/api/foundary-organization/create`,
                {
                    name,
                    establishedAt,
                }
            );
            set((state) => ({
                members: [...state.organizations, response.data],
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
    deleteOrganization: async(id) => {
        set({ Loading: true });
        try {
            await axios.delete(
                `${backendUrl}/api/foundary-organization/delete/${id}`
            );
            set((state) => ({
                organizations: state.organizations.filter((org) => org.id !== id),
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

