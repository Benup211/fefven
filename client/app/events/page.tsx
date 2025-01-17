"use client";
import { useState, useEffect } from 'react'
import { useLanguage } from "@/contexts/language-context"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Search, Grid, List, ArrowUp } from 'lucide-react'
import { EventDetails } from '@/components/events/event-details'

// Mock data for events
const eventsData = {
  en: [
    {
      id: 2,
      title: "Organic Farming Workshop",
      description: "Learn about the latest organic farming techniques from industry experts and successful farmers.",
      category: "Workshop",
      tags: "Agriculture, Organic Farming",
      startDate: "2023-12-05",
      startTime: "10:00",
      endDate: "2023-12-05",
      endTime: "17:00",
      venueName: "Pokhara Agricultural Institute",
      venueAddress: "Pokhara",
      city: "Pokhara",
      organizerName: "Pokhara Agricultural Institute",
      organizerContact: "+977 61 555555",
      organizerWebsite: "https://www.pai.org.np",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Fruit Tree Planting Drive",
      description: "Participate in our annual fruit tree planting initiative to promote sustainable agriculture and environmental conservation.",
      category: "Community Event",
      tags: "Environment, Community, Sustainability",
      startDate: "2024-01-20",
      startTime: "09:00",
      endDate: "2024-01-20",
      endTime: "16:00",
      venueName: "Various locations across Nepal",
      venueAddress: "Various locations across Nepal",
      city: "Various locations across Nepal",
      organizerName: "Green Nepal Initiative",
      organizerContact: "+977 984 1111111",
      organizerWebsite: "https://www.green-nepal.org",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "International Agriculture Technology Conference",
      description: "Explore the latest advancements in agricultural technology and their applications in fruit and vegetable cultivation.",
      category: "Conference",
      tags: "Agriculture, Technology, Innovation",
      startDate: "2024-02-10",
      startTime: "10:00",
      endDate: "2024-02-12",
      endTime: "17:00",
      venueName: "Bhaktapur Convention Center",
      venueAddress: "Bhaktapur",
      city: "Bhaktapur",
      organizerName: "International Agriculture Society",
      organizerContact: "+977 1 2222222",
      organizerWebsite: "https://www.ias.org",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Farmers' Market Festival",
      description: "A week-long celebration of local produce, featuring fresh fruits and vegetables directly from farmers across Nepal.",
      category: "Festival",
      tags: "Agriculture, Local Produce, Community",
      startDate: "2024-03-01",
      startTime: "10:00",
      endDate: "2024-03-07",
      endTime: "18:00",
      venueName: "Patan Durbar Square",
      venueAddress: "Patan",
      city: "Lalitpur",
      organizerName: "Patan Farmers' Association",
      organizerContact: "+977 1 3333333",
      organizerWebsite: "https://www.pfa.org.np",
      image: "/placeholder.svg?height=400&width=600",
    },
  ],
  ne: [
    {
      id: 2,
      title: "जैविक खेती कार्यशाला",
      description: "उद्योग विशेषज्ञ र सफल किसानहरूबाट नवीनतम जैविक खेती प्रविधिहरूको बारेमा जान्नुहोस्।",
      category: "कार्यशाला",
      tags: "कृषि, जैविक खेती",
      startDate: "2023-12-05",
      startTime: "10:00",
      endDate: "2023-12-05",
      endTime: "17:00",
      venueName: "पोखरा कृषि संस्थान",
      venueAddress: "पोखरा",
      city: "पोखरा",
      organizerName: "पोखरा कृषि संस्थान",
      organizerContact: "+९७७ ६१ ५५५५५५",
      organizerWebsite: "https://www.pai.org.np",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "फलफूल वृक्षारोपण अभियान",
      description: "दिगो कृषि र वातावरण संरक्षणलाई बढावा दिन हाम्रो वार्षिक फलफूल वृक्षारोपण पहलमा सहभागी हुनुहोस्।",
      category: "सामुदायिक कार्यक्रम",
      tags: "वातावरण, समुदाय, दिगोपना",
      startDate: "2024-01-20",
      startTime: "09:00",
      endDate: "2024-01-20",
      endTime: "16:00",
      venueName: "नेपालभरका विभिन्न स्थानहरू",
      venueAddress: "नेपालभरका विभिन्न स्थानहरू",
      city: "नेपालभरका विभिन्न स्थानहरू",
      organizerName: "हरित नेपाल पहल",
      organizerContact: "+९७७ ९८४ १११११११",
      organizerWebsite: "https://www.green-nepal.org",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "अन्तर्राष्ट्रिय कृषि प्रविधि सम्मेलन",
      description: "कृषि प्रविधिमा नवीनतम प्रगति र फलफूल तथा तरकारी खेतीमा तिनको प्रयोगको अन्वेषण गर्नुहोस्।",
      category: "सम्मेलन",
      tags: "कृषि, प्रविधि, नवोन्मेष",
      startDate: "2024-02-10",
      startTime: "10:00",
      endDate: "2024-02-12",
      endTime: "17:00",
      venueName: "भक्तपुर सम्मेलन केन्द्र",
      venueAddress: "भक्तपुर",
      city: "भक्तपुर",
      organizerName: "अन्तर्राष्ट्रिय कृषि समाज",
      organizerContact: "+९७७ १ २२२२२२२",
      organizerWebsite: "https://www.ias.org",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "किसान बजार महोत्सव",
      description: "नेपालभरका किसानहरूबाट सीधै ताजा फलफूल र तरकारी प्रस्तुत गर्दै स्थानीय उत्पादनको एक हप्ता लामो उत्सव।",
      category: "महोत्सव",
      tags: "कृषि, स्थानीय उत्पादन, समुदाय",
      startDate: "2024-03-01",
      startTime: "10:00",
      endDate: "2024-03-07",
      endTime: "18:00",
      venueName: "पाटन दरबार स्क्वायर",
      venueAddress: "पाटन",
      city: "ललितपुर",
      organizerName: "पाटन किसान संघ",
      organizerContact: "+९७७ १ ३३३३३३३",
      organizerWebsite: "https://www.pfa.org.np",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "किसान बजार महोत्सव",
      description: "नेपालभरका किसानहरूबाट सीधै ताजा फलफूल र तरकारी प्रस्तुत गर्दै स्थानीय उत्पादनको एक हप्ता लामो उत्सव।",
      category: "महोत्सव",
      tags: "कृषि, स्थानीय उत्पादन, समुदाय",
      startDate: "2024-03-01",
      startTime: "10:00",
      endDate: "2024-03-07",
      endTime: "18:00",
      venueName: "पाटन दरबार स्क्वायर",
      venueAddress: "पाटन",
      city: "ललितपुर",
      organizerName: "पाटन किसान संघ",
      organizerContact: "+९७७ १ ३३३३३३३",
      organizerWebsite: "https://www.pfa.org.np",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 7,
      title: "किसान बजार महोत्सव",
      description: "नेपालभरका किसानहरूबाट सीधै ताजा फलफूल र तरकारी प्रस्तुत गर्दै स्थानीय उत्पादनको एक हप्ता लामो उत्सव।",
      category: "महोत्सव",
      tags: "कृषि, स्थानीय उत्पादन, समुदाय",
      startDate: "2024-03-01",
      startTime: "10:00",
      endDate: "2024-03-07",
      endTime: "18:00",
      venueName: "पाटन दरबार स्क्वायर",
      venueAddress: "पाटन",
      city: "ललितपुर",
      organizerName: "पाटन किसान संघ",
      organizerContact: "+९७७ १ ३३३३३३३",
      organizerWebsite: "https://www.pfa.org.np",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 8,
      title: "किसान बजार महोत्सव",
      description: "नेपालभरका किसानहरूबाट सीधै ताजा फलफूल र तरकारी प्रस्तुत गर्दै स्थानीय उत्पादनको एक हप्ता लामो उत्सव।",
      category: "महोत्सव",
      tags: "कृषि, स्थानीय उत्पादन, समुदाय",
      startDate: "2024-03-01",
      startTime: "10:00",
      endDate: "2024-03-07",
      endTime: "18:00",
      venueName: "पाटन दरबार स्क्वायर",
      venueAddress: "पाटन",
      city: "ललितपुर",
      organizerName: "पाटन किसान संघ",
      organizerContact: "+९७७ १ ३३३३३३३",
      organizerWebsite: "https://www.pfa.org.np",
      image: "/placeholder.svg?height=400&width=600",
    }
  ]
}

const itemsPerPage = 6

export default function EventsPage() {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  interface Event {
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
    organizerWebsite: string;
    image: string;
  }
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const content = {
    en: {
      title: "Upcoming Events",
      searchPlaceholder: "Search events...",
      noResults: "No events found.",
      gridView: "Grid View",
      tableView: "Table View",
      viewDetails: "View Details",
      backToTop: "Back to Top",
      tableHeaders: {
        date: "Date",
        title: "Title",
        location: "Location",
        actions: "Actions",
      },
    },
    ne: {
      title: "आगामी कार्यक्रमहरू",
      searchPlaceholder: "कार्यक्रमहरू खोज्नुहोस्...",
      noResults: "कुनै कार्यक्रम फेला परेन।",
      gridView: "ग्रिड दृश्य",
      tableView: "तालिका दृश्य",
      viewDetails: "विवरण हेर्नुहोस्",
      backToTop: "माथि जानुहोस्",
      tableHeaders: {
        date: "मिति",
        title: "शीर्षक",
        location: "स्थान",
        actions: "कार्यहरू",
      },
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredEvents = eventsData[language].filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginatedEvents.map((event) => (
        <Card key={event.id} className="flex flex-col h-full" onClick={() => setSelectedEvent(event)}>
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardHeader>
            <CardTitle className="text-primary">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> {event.startDate}
            </p>
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <MapPin className="mr-2 h-4 w-4" /> {event.venueName}, {event.city}
            </p>
            <p className="line-clamp-3">{event.description}</p>
          </CardContent>
          <CardFooter className="justify-between items-center">
            <p className="text-sm text-muted-foreground">{event.category}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{content[language].tableHeaders.date}</TableHead>
          <TableHead>{content[language].tableHeaders.title}</TableHead>
          <TableHead className="hidden md:table-cell">{content[language].tableHeaders.location}</TableHead>
          <TableHead>{content[language].tableHeaders.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedEvents.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.startDate}</TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell className="hidden md:table-cell">{event.venueName}, {event.city}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                {content[language].viewDetails}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
        <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as 'grid' | 'table')}>
          <TabsList>
            <TabsTrigger value="grid">
              <Grid className="mr-2" />
              {content[language].gridView}
            </TabsTrigger>
            <TabsTrigger value="table">
              <List className="mr-2" />
              {content[language].tableView}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as 'grid' | 'table')}>
        <TabsContent value="grid">
          {paginatedEvents.length > 0 ? (
            <GridView />
          ) : (
            <p className="text-center text-muted-foreground">{content[language].noResults}</p>
          )}
        </TabsContent>
        <TabsContent value="table">
          {paginatedEvents.length > 0 ? (
            <TableView />
          ) : (
            <p className="text-center text-muted-foreground">{content[language].noResults}</p>
          )}
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage ===1?'disabled':''}
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
                className={currentPage === totalPages?'disabled':''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        </div>
      )}

      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full"
          onClick={scrollToTop}
          size="icon"
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">{content[language].backToTop}</span>
        </Button>
      )}
    </div>
  )
}

