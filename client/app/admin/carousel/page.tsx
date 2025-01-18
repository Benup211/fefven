"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Trash2, Upload } from 'lucide-react'
import useCarouselStore from '@/state/admin/carousel-store'
import { useState } from 'react'
import { NewCarouselItem } from '@/lib/types'

export default function AdminCarouselPage() {
  const { 
    items, 
    searchTerm, 
    isLoading, 
    error,
    fetchItems, 
    addItem, 
    deleteItem, 
    setSearchTerm 
  } = useCarouselStore()

  const [newItem, setNewItem] = useState<NewCarouselItem>({
    title: '',
    description: '',
    file: null
  })
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    // Cleanup preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewItem({ ...newItem, file })
      
      // Cleanup previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      
      // Create new preview URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newItem.title && newItem.description && newItem.file) {
      await addItem(newItem)
      setNewItem({ title: '', description: '', file: null })
      // Cleanup preview URL after submission
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl('')
      }
    }
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Carousel Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Carousel Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <Label htmlFor="itemTitle">Title</Label>
              <Input
                id="itemTitle"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Enter title"
                className="mb-2"
              />
            </div>
            <div>
              <Label htmlFor="itemDescription">Description</Label>
              <Textarea
                id="itemDescription"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Enter description"
                className="mb-2"
              />
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemImage">Image</Label>
                <Input
                  id="itemImage"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="mb-2"
                />
              </div>
              {previewUrl && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Upload className="mr-2 h-4 w-4" /> Add Carousel Item
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search carousel items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative w-20 h-20">
                      <Image
                        src={`http://localhost:3001/uploads/images/${item.imageUrl}`}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{item.description}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}