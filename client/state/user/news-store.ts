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
    gotNews:NewsProps| null;
    fetchNews: () => Promise<void>;
    getNewsById: (id: number) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const backendUrl = await getBackendUrl();

const useUserNewsStore = create<NewsStore>((set) => ({
    news: [],
    isLoading: false,
    error: null,
    gotNews:null,
    fetchNews: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${backendUrl}/api/news/all`);
            set({ news: response.data, isLoading: false,error:null });
        } catch (error) {
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                news: [],
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }
    },
    getNewsById: async(id: number) => {
        set({ isLoading: true,error:null,gotNews:null });
        try{
            const response=await axios.get(`${backendUrl}/api/news/${id}`);
            set({gotNews:response.data,isLoading:false,error:null});
        }catch(error){
            const { response } = error as AxiosError<IErrorResponse>;
            set({
                gotNews: null,
                error: response?.data.errorMessage ?? "Server is not connected",
                isLoading: false,
            });
        }

    },
    
}));

export default useUserNewsStore;
