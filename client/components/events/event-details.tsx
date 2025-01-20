"use client"

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, User, Globe, Tag, X } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

interface EventDetailsProps {
  event: {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    venueName: string;
    venueAddress: string;
    city: string;
    organizerName: string;
    organizerContact: string;
    organizerWebsite?: string;
    createdAt: string;
    updatedAt: string;
  }
  onClose: () => void
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const { language } = useLanguage()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const content = {
    en: {
      close: "Close",
      category: "Category",
      date: "Date",
      time: "Time",
      venue: "Venue",
      organizer: "Organizer",
      website: "Website",
      tags: "Tags",
    },
    ne: {
      close: "बन्द गर्नुहोस्",
      category: "वर्ग",
      date: "मिति",
      time: "समय",
      venue: "स्थान",
      organizer: "आयोजक",
      website: "वेबसाइट",
      tags: "ट्यागहरू",
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', options)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{event.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold mr-2">{content[language].category}:</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                {event.category}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold mr-2">{content[language].date}:</span>
              <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold mr-2">{content[language].time}:</span>
              <span>{event.startTime} - {event.endTime}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold mr-2">{content[language].venue}:</span>
              <span>{event.venueName}, {event.city}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold mr-2">{content[language].organizer}:</span>
              <span>{event.organizerName}</span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold mr-2">{content[language].website}:</span>
              <a href={event.organizerWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {event.organizerWebsite}
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap">
          <Tag className="mr-2 h-4 w-4 text-primary" />
          <span className="font-semibold mr-2">{content[language].tags}:</span>
          {event.tags.split(',').map((tag, index) => (
            <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm mr-2 mb-2">
              {tag.trim()}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={onClose}>{content[language].close}</Button>
      </CardFooter>
    </Card>
  )
}

