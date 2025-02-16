"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import useUserFlashNewsStore from "@/state/user/flashnews-store"

export function FlashCard() {
  const [isVisible, setIsVisible] = useState(true)
  const hasSeenFlashCard = useRef(false)
  const { items, isLoading, fetchItems } = useUserFlashNewsStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!hasSeenFlashCard.current) {
        setIsVisible(true)
        await fetchItems();
        hasSeenFlashCard.current = true
      } else {
        setIsVisible(false)
      }
    }
    fetchData();
  }, [fetchItems])

  const closeFlashCard = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null
  if (isLoading || items === null) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <Card className="w-full h-ful max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative">
        <button
          onClick={closeFlashCard}
          className="absolute top-2 right-2 text-white hover:text-gray-200 z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <CardContent className="p-0">
          <div className="relative w-full h-[500px] md:h-[600px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${items.imageUrl}`}
              alt={`${items.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-4">
                {items.title}
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

