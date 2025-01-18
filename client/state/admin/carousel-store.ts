import { create } from 'zustand'
import axios from 'axios'
import { CarouselItem, NewCarouselItem } from '@/lib/types'

interface CarouselStore {
  items: CarouselItem[]
  searchTerm: string
  isLoading: boolean
  error: string | null
  fetchItems: () => Promise<void>
  addItem: (newItem: NewCarouselItem) => Promise<void>
  deleteItem: (id: number) => Promise<void>
  setSearchTerm: (term: string) => void
}

const useCarouselStore = create<CarouselStore>((set, get) => ({
  items: [],
  searchTerm: '',
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('http://localhost:3001/api/carousel/all')
      set({ items: response.data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch carousel items', isLoading: false })
    }
  },

  addItem: async (newItem: NewCarouselItem) => {
    set({ isLoading: true, error: null })
    try {
      const formData = new FormData()
      formData.append('title', newItem.title)
      formData.append('description', newItem.description)
      if (newItem.file) {
        formData.append('file', newItem.file)
      }

      const response = await axios.post('http://localhost:3001/api/carousel/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      const { items } = get()
      set({ 
        items: [...items, response.data],
        isLoading: false 
      })
    } catch (error) {
      set({ error: 'Failed to add carousel item', isLoading: false })
    }
  },

  deleteItem: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await axios.delete(`http://localhost:3001/api/carousel/delete/${id}`)
      const { items } = get()
      set({ 
        items: items.filter(item => item.id !== id),
        isLoading: false 
      })
    } catch (error) {
      set({ error: 'Failed to delete carousel item', isLoading: false })
    }
  },

  setSearchTerm: (term: string) => set({ searchTerm: term }),
}))

export default useCarouselStore