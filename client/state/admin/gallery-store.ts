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
    addImage: (title: string, file: File) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteImage: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useGalleryStore = create<GalleryStore>((set) => ({
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
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
    addImage: async (title: string, file: File) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("file", file);
            const response = await axios.post(
                `${backendUrl}/api/gallery/create`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            set((state) => ({
                images: [...state.images, response.data],
                isLoading: false,
            }));
            return { success: true,error: null };
        } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ isLoading: false })
          return { success: false,error: response?.data.errorMessage??"Server is not connected" };
        }
    },
    deleteImage: async (id: number) => {
        set({ isLoading: true });
        try {
            await axios.delete(`${backendUrl}/api/gallery/delete/${id}`);
            set((state) => ({
                images: state.images.filter((img) => img.id !== id),
                isLoading: false,
            }));
            return { success: true,error: null };
        } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ isLoading: false })
          return { success: false, error: response?.data.errorMessage??"Server is not connected"};
        }
    },
}));

export default useGalleryStore;
