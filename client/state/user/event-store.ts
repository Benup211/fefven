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
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useUserEventStore = create<EventStore>((set) => ({
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
                events: [],
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
}));

export default useUserEventStore;
