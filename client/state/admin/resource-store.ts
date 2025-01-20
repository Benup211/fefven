import { create } from 'zustand'
import axios, { AxiosError } from 'axios'
import getBackendUrl from '@/lib/get-backend-url';
import { IErrorResponse } from '@/lib/types';

interface Resource {
  id: number
  title: string
  description: string
  file: File
  fileUrl?:string
}

interface ResourceStore {
  resources: Resource[]
  isLoading: boolean
  error: string | null
  fetchResources: () => Promise<void>
  deleteResource: (id: number) => Promise<{
    success: boolean,
    error: string|null
  }>
  createResource: (data: FormData) => Promise<{
    success: boolean,
    error: string|null
  }>
}

const backendUrl =await getBackendUrl();

const useResourceStore = create<ResourceStore>((set) => ({
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
      set({ error: response?.data.errorMessage??"Server is not connected", isLoading: false })
    }
  },
  deleteResource: async (id: number) => {
    set({ isLoading: true })
    try {
      await axios.delete(`${backendUrl}/api/resource/delete/${id}`)
      set((state) => ({
        resources: state.resources.filter((resource) => resource.id !== id),
        isLoading: false,
      }))
      return {
        success: true,
        error: null
      }
    } catch (error) {
      const { response } = error as AxiosError<IErrorResponse>;
      set({isLoading: false })
      return {
        success: false,
        error: response?.data.errorMessage??"Server is not connected"
      }
    }
  },
  createResource: async (data: FormData) => {
    set({ isLoading: true })
    try {
      const response = await axios.post(`${backendUrl}/api/resource/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      set((state) => ({
        resources: [...state.resources, response.data],
        isLoading: false,
        error: null,
      }))
      return {
        success: true,
        error: null
      }
    } catch (error) {
      const { response } = error as AxiosError<IErrorResponse>;
      set({isLoading: false })
      return {
        success: false,
        error: response?.data.errorMessage??"Server is not connected"
      }
    }
  },
}))

export default useResourceStore

