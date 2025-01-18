import { create } from 'zustand'
import axios from 'axios'

interface GalleryImage {
  id: number
  title: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

interface GalleryStore {
  images: GalleryImage[]
  fetchImages: () => Promise<void>
  addImage: (title: string, file: File) => Promise<void>
  deleteImage: (id: number) => Promise<void>
  isLoading: boolean
}

const useGalleryStore = create<GalleryStore>((set) => ({
  images: [],
  isLoading: false,
  fetchImages: async () => {
    set({ isLoading: true })
    try {
      const response = await axios.get('http://localhost:3001/api/gallery/all')
      set({ images: response.data, isLoading: false })
    } catch (error) {
      console.error('Error fetching images:', error)
      set({ isLoading: false })
    }
  },
  addImage: async (title: string, file: File) => {
    set({ isLoading: true })
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)
      const response = await axios.post('http://localhost:3001/api/gallery/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      set((state) => ({ images: [...state.images, response.data], isLoading: false }))
    } catch (error) {
      console.error('Error adding image:', error)
      set({ isLoading: false })
    }
  },
  deleteImage: async (id: number) => {
    set({ isLoading: true })
    try {
      await axios.delete(`http://localhost:3001/api/gallery/delete/${id}`)
      set((state) => ({ images: state.images.filter((img) => img.id !== id), isLoading: false }))
    } catch (error) {
      console.error('Error deleting image:', error)
      set({ isLoading: false })
    }
  },
}))

export default useGalleryStore

