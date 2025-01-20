"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
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
import { Search, ZoomIn, Grid, Columns } from "lucide-react"
import useUserGalleryStore from "@/state/user/gallery-store"

const itemsPerPage = 9

export default function GalleryPage() {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<{
    id: number
    title: string
    imageUrl: string
    createdAt: string
    updatedAt: string
  } | null>(null)
  const [layout, setLayout] = useState<"grid" | "masonry">("masonry")
  const { images, fetchImages } = useUserGalleryStore()
  const isFetched = useRef(false)
  const [galleryItems, setGalleryItems] = useState<
    {
      id: number
      title: string
      imageUrl: string
      createdAt: string
      updatedAt: string
    }[]
  >([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched.current) return
      isFetched.current = true
      try {
        setLoadingData(true)
        await fetchImages()
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [fetchImages])

  useEffect(() => {
    setGalleryItems(images)
  }, [images])

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
    },
  }

  const filteredImages = galleryItems.filter((image) => image.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const paginatedImages = filteredImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedImages.map((image) => (
        <Card key={image.id} className="overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image)}>
          <CardContent className="p-0 relative group">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${image.imageUrl}` || "/placeholder.svg"}
              alt={image.title}
              title={image.title}
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
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${image.imageUrl}` || "/placeholder.svg"}
            alt={image.title}
            title={image.title}
            width={400}
            height={300}
            className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  )

  if (loadingData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">{content[language].title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

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
        <Tabs value={layout} onValueChange={(value: string) => setLayout(value as "grid" | "masonry")}>
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
        <p className="text-center text-primary text-xl underline">{content[language].noResults}</p>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "disabled" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "disabled" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${selectedImage.imageUrl}` || "/placeholder.svg"}
              alt={selectedImage.title}
              title={selectedImage.title}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
            <Button variant="secondary" className="absolute top-4 right-4" onClick={() => setSelectedImage(null)}>
              {content[language].close}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

