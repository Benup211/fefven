import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";
interface EventTypes {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    venueName: string;
    venueAddress: string;
    city: string;
    organizerName: string;
    organizerContact: string;
    organizerWebsite?: string;
    createdAt: string;
    updatedAt: string;
}

interface EventStore {
    events: EventTypes[];
    fetchEvents: () => Promise<void>;
    addEvents: (title: string, description: string, category: string, tags: string, startDate: Date, startTime: string, endDate: Date, endTime: string, venueName: string, venueAddress: string, city: string, organizerName: string, organizerContact: string, organizerWebsite?: string) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteEvents: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useEventStore = create<EventStore>((set) => ({
    events: [],
    isLoading: false,
    error: null,
    fetchEvents: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${backendUrl}/api/events/all`);
            set({ events: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
    addEvents: async (title,description,category,tags,startDate,startTime,endDate,endTime,venueName,venueAddress,city,organizerName,organizerContact,organizerWebsite) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                `${backendUrl}/api/events/create`,
                {
                    title,
                    description,
                    category,
                    tags,
                    startDate,
                    startTime,
                    endDate,
                    endTime,
                    venueName,
                    venueAddress,
                    city,
                    organizerName,
                    organizerContact,
                    organizerWebsite,
                }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            set((state) => ({
                events: [...state.events, response.data],
                isLoading: false,
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
    deleteEvents: async (id: number) => {
        set({ isLoading: true });
        try {
            await axios.delete(`${backendUrl}/api/events/delete/${id}`);
            set((state) => ({
                events: state.events.filter((event) => event.id !== id),
                isLoading: false,
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

export default useEventStore;
