import { create } from 'zustand'
import axios, { AxiosError } from 'axios'
import getBackendUrl from '@/lib/get-backend-url';
import { IErrorResponse } from '@/lib/types';

interface Resource {
  id: number
  title: string
  description: string
  fileUrl:string
}

interface ResourceStore {
  resources: Resource[]
  isLoading: boolean
  error: string | null
  fetchResources: () => Promise<void>
}

const backendUrl =await getBackendUrl();

const useUserResourceStore = create<ResourceStore>((set) => ({
  resources: [],
  isLoading: false,
  error: null,
  fetchResources: async () => {
    set({ isLoading: true })
    try {
      const response = await axios.get(`${backendUrl}/api/resource/all`)
      set({ resources: response.data, isLoading: false, error: null })
    } catch (error) {
        const { response } = error as AxiosError<IErrorResponse>;
        set({
            resources: [],
            error: response?.data.errorMessage ?? "Server is not connected",
            isLoading: false,
        });
    }
  },
}))

export default useUserResourceStore

