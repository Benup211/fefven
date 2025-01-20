import { create } from "zustand";
import axios, { AxiosError } from "axios";
import getBackendUrl from "@/lib/get-backend-url";
import { IErrorResponse } from "@/lib/types";
interface NewsProps {
    id: number;
    title: string;
    description: string;
    author: string;
    content:string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface NewsStore {
    news: NewsProps[];
    fetchNews: () => Promise<void>;
    addNews: (title: string, description:string,author:string,file: File,content:string) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    deleteNews: (id: number) => Promise<{
        success: boolean;
        error: string | null;
    }>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useNewsStore = create<NewsStore>((set) => ({
    news: [],
    isLoading: false,
    error: null,
    fetchNews: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${backendUrl}/api/news/all`);
            set({ news: response.data, isLoading: false });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
    addNews: async (title: string, description:string,author:string,file: File,content:string) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("author", author);
            formData.append("file", file);
            formData.append("content", content);
            const response = await axios.post(
                `${backendUrl}/api/news/create`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            set((state) => ({
                news: [...state.news, response.data],
                isLoading: false,
            }));
            return { success: true,error: null };
        } catch (error) {
          const { response } = error as AxiosError<IErrorResponse>;
          set({ isLoading: false })
          return { success: false,error: response?.data.errorMessage??"Server is not connected" };
        }
    },
    deleteNews: async (id: number) => {
        set({ isLoading: true });
        try {
            await axios.delete(`${backendUrl}/api/news/delete/${id}`);
            set((state) => ({
                news: state.news.filter((newz) => newz.id !== id),
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

export default useNewsStore;
