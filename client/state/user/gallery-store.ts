import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";
interface GalleryImage {
    id: number;
    title: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface GalleryStore {
    images: GalleryImage[];
    fetchImages: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useUserGalleryStore = create<GalleryStore>((set) => ({
    images: [],
    isLoading: false,
    error: null,
    fetchImages: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${backendUrl}/api/gallery/all`);
            set({ images: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                images: [],
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
}));

export default useUserGalleryStore;
