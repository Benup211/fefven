import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";

export enum EnrollmentStatus {
    ALL = "ALL",
    PAST = "PAST",
    PRESENT = "PRESENT",
}

export interface FederationMember {
    id: number;
    name: string;
    imageUrl: string;
    contactNo: string;
    designation: string;
    startDate: string;
    endDate: string;
    designationPriority: number;
    enrollmentStatus: EnrollmentStatus;
}

interface MemberStore {
    members: FederationMember[];
    loading: boolean;
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
export const useMemberStore = create<MemberStore>((set) => ({
    members: [],
    loading: false,
    error: null,

    fetchMembers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${backendUrl}/api/federation-member/all`
            );
            set({ members: response.data, loading: false, error: null });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                loading: false,
            });
        }
    },

    addMember: async (memberData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(
                `${backendUrl}/api/federation-member/create`,
                memberData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            set((state) => ({
                members: [...state.members, response.data],
                loading: false,
            }));
            return { success: true, error: null };
        } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ loading: false });
          return {
              success: false,
              error: response?.data.errorMessage ?? "Server is not connected",
          };
        }
    },

    deleteMember: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(
                `${backendUrl}/api/federation-member/delete/${id}`
            );
            set((state) => ({
                members: state.members.filter((member) => member.id !== id),
                loading: false,
            }));
            return { success: true, error: null };
        } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ loading: false });
          return {
              success: false,
              error: response?.data.errorMessage ?? "Server is not connected",
          };
        }
    },
}));
