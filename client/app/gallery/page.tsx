"use client"

import { useState, useEffect } from 'react'
import { useLanguage } from "@/contexts/language-context"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ZoomIn, Grid, Columns } from 'lucide-react'

// Mock data for gallery images
const galleryData = [
  { id: 1, title: "Fruit Exhibition", src: "/placeholder.svg?height=300&width=400", alt: "Fruit Exhibition" },
  { id: 2, title: "Vegetable Market", src: "/placeholder.svg?height=400&width=300", alt: "Vegetable Market" },
  { id: 3, title: "Organic Farming", src: "/placeholder.svg?height=300&width=400", alt: "Organic Farming" },
  { id: 4, title: "Harvest Festival", src: "/placeholder.svg?height=400&width=300", alt: "Harvest Festival" },
  { id: 5, title: "Farmer's Workshop", src: "/placeholder.svg?height=300&width=400", alt: "Farmer's Workshop" },
  { id: 6, title: "Agricultural Technology", src: "/placeholder.svg?height=400&width=300", alt: "Agricultural Technology" },
  { id: 7, title: "Fruit Orchard", src: "/placeholder.svg?height=300&width=400", alt: "Fruit Orchard" },
  { id: 8, title: "Vegetable Greenhouse", src: "/placeholder.svg?height=400&width=300", alt: "Vegetable Greenhouse" },
  { id: 9, title: "Farmers Market", src: "/placeholder.svg?height=300&width=400", alt: "Farmers Market" },
  { id: 10, title: "Irrigation Systems", src: "/placeholder.svg?height=400&width=300", alt: "Irrigation Systems" },
  { id: 11, title: "Crop Harvesting", src: "/placeholder.svg?height=300&width=400", alt: "Crop Harvesting" },
  { id: 12, title: "Sustainable Farming", src: "/placeholder.svg?height=400&width=300", alt: "Sustainable Farming" },
]

const itemsPerPage = 9

export default function GalleryPage() {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState<{ id: number, title: string, src: string, alt: string } | null>(null)
  const [layout, setLayout] = useState<'grid' | 'masonry'>('grid')

  const content = {
    en: {
      title: "Photo Gallery",
      searchPlaceholder: "Search images...",
      noResults: "No images found.",
      close: "Close",
      gridView: "Grid View",
      masonryView: "Masonry View",
    },
    ne: {
      title: "फोटो ग्यालरी",
      searchPlaceholder: "तस्विरहरू खोज्नुहोस्...",
      noResults: "कुनै तस्विर फेला परेन।",
      close: "बन्द गर्नुहोस्",
      gridView: "ग्रिड दृश्य",
      masonryView: "मेसनरी दृश्य",
    }
  }

  const filteredImages = galleryData.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedImages.map((image) => (
        <Card key={image.id} className="overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image)}>
          <CardContent className="p-0 relative group">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn className="text-white w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const MasonryView = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {paginatedImages.map((image) => (
        <div key={image.id} className="mb-4 cursor-pointer" onClick={() => setSelectedImage(image)}>
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            width={400}
            height={300}
            className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">{content[language].title}</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={content[language].searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Tabs value={layout} onValueChange={(value: string) => setLayout(value as 'grid' | 'masonry')}>
          <TabsList>
            <TabsTrigger value="grid">
              <Grid className="mr-2" />
              {content[language].gridView}
            </TabsTrigger>
            <TabsTrigger value="masonry">
              <Columns className="mr-2" />
              {content[language].masonryView}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {paginatedImages.length > 0 ? (
        <Tabs value={layout}>
          <TabsContent value="grid">
            <GridView />
          </TabsContent>
          <TabsContent value="masonry">
            <MasonryView />
          </TabsContent>
        </Tabs>
      ) : (
        <p className="text-center text-muted-foreground">{content[language].noResults}</p>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'disabled' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'disabled' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl w-full">
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
            <Button
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              {content[language].close}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

