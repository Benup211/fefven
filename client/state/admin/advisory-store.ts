import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

interface AdvisoryMember {
    id: number;
    name: string;
    imageUrl: string;
    contactNo: string;
    designation: string;
    designationPriority: number;
}

interface AdvisoryMembersState {
    members: AdvisoryMember[];
    isLoading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
    addMember: (member: FormData) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteMember: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
}

const backendUrl = await getBackendUrl();
export const useAdvisoryMembersStore = create<AdvisoryMembersState>((set) => ({
    members: [],
    isLoading: false,
    error: null,
    fetchMembers: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                `${backendUrl}/api/advisory-member/all`
            );
            set({ members: response.data, isLoading: false, error: null });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
    addMember: async (member) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
              `${backendUrl}/api/advisory-member/create`,
              member,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              }
            );
            set((state) => ({
              members: [...state.members, response.data],
              isLoading: false,
              error: null,
          }));
          return { success: true, error: null };
      } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ isLoading: false });
          return {
              success: false,
              error: response?.data.errorMessage ?? "Server is not connected",
          };
      }
    },
    deleteMember: async (id) => {
      set({ isLoading: true });
      try {
          await axios.delete(
              `${backendUrl}/api/advisory-member/delete/${id}`
          );
          set((state) => ({
              members: state.members.filter((member) => member.id !== id),
              isLoading: false,
              error: null,
          }));
          return { success: true, error: null };
      } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ isLoading: false });
          return {
              success: false,
              error: response?.data.errorMessage ?? "Server is not connected",
          };
      }
  },
}));
