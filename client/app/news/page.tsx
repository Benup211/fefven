"use client"

import { useState } from 'react'
import { useLanguage } from "@/contexts/language-context"
import Image from 'next/image'
import Link from 'next/link'
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
import { ChevronRight, Search, Grid, List } from 'lucide-react'

// Mock data for news items
const newsData = {
  en: [
    {
      id: 1,
      title: "New Export Regulations Announced",
      summary: "The government has announced new regulations to boost fruit and vegetable exports. These changes aim to simplify the export process and open up new markets for Nepali produce.",
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-09-15",
      slug: "new-export-regulations"
    },
    {
      id: 2,
      title: "Annual Mango Festival Success",
      summary: "This year's Mango Festival saw record attendance and sales. Farmers from across Nepal showcased over 50 varieties of mangoes, attracting both local and international buyers.",
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-06-20",
      slug: "annual-mango-festival-success"
    },
    {
      id: 3,
      title: "New Organic Certification Process",
      summary: "A streamlined organic certification process has been introduced for farmers. This new system is expected to reduce certification time and costs, making it easier for small-scale farmers to enter the organic market.",
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-07-05",
      slug: "new-organic-certification-process"
    },
  ],
  ne: [
    {
      id: 1,
      title: "नयाँ निर्यात नियमहरू घोषणा",
      summary: "सरकारले फलफूल र तरकारी निर्यात बढाउन नयाँ नियमहरू घोषणा गरेको छ। यी परिवर्तनहरूले निर्यात प्रक्रियालाई सरल बनाउने र नेपाली उत्पादनका लागि नयाँ बजारहरू खोल्ने लक्ष्य राखेका छन्।",
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-09-15",
      slug: "new-export-regulations"
    },
    {
      id: 2,
      title: "वार्षिक आँप महोत्सव सफलता",
      summary: "यस वर्षको आँप महोत्सवमा रेकर्ड उपस्थिति र बिक्री देखियो। नेपालभरका किसानहरूले ५० भन्दा बढी प्रकारका आँपहरू प्रदर्शन गरे, जसले स्थानीय र अन्तर्राष्ट्रिय खरीदकर्ताहरूलाई आकर्षित गर्यो।",
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-06-20",
      slug: "annual-mango-festival-success"
    },
    {
      id: 3,
      title: "नयाँ जैविक प्रमाणीकरण प्रक्रिया",
      summary: "किसानहरूका लागि सरलीकृत जैविक प्रमाणीकरण प्रक्रिया शुरू गरिएको छ। यो नयाँ प्रणालीले प्रमाणीकरण समय र लागत घटाउने अपेक्षा गरिएको छ, जसले साना किसानहरूलाई जैविक बजारमा प्रवेश गर्न सजिलो बनाउँछ।",
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-07-05",
      slug: "new-organic-certification-process"
    },
  ]
}

const itemsPerPage = 6

export default function NewsPage() {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const content = {
    en: {
      title: "Latest News",
      searchPlaceholder: "Search news...",
      readMore: "Read More",
      noResults: "No news items found.",
      gridView: "Grid View",
      tableView: "Table View",
      tableHeaders: {
        date: "Date",
        title: "Title",
        summary: "Summary",
        actions: "Actions",
      },
    },
    ne: {
      title: "ताजा समाचार",
      searchPlaceholder: "समाचार खोज्नुहोस्...",
      readMore: "थप पढ्नुहोस्",
      noResults: "कुनै समाचार फेला परेन।",
      gridView: "ग्रिड दृश्य",
      tableView: "तालिका दृश्य",
      tableHeaders: {
        date: "मिति",
        title: "शीर्षक",
        summary: "सारांश",
        actions: "कार्यहरू",
      },
    }
  }

  const filteredNews = newsData[language].filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )


  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginatedNews.map((item) => (
        <Card key={item.id} className="flex flex-col">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle className="text-primary">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-2">{(item.date)}</p>
            <p className="line-clamp-3">{item.summary}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/news/${item.slug}`} passHref>
              <Button variant="outline" className="w-full text-accent hover:bg-accent hover:text-accent-foreground">
                {content[language].readMore} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
          <TableHead className="hidden md:table-cell">{content[language].tableHeaders.summary}</TableHead>
          <TableHead>{content[language].tableHeaders.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedNews.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{(item.date)}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell className="hidden md:table-cell">
              <p className="line-clamp-2">{item.summary}</p>
            </TableCell>
            <TableCell>
              <Link href={`/news/${item.slug}`} passHref>
                <Button variant="outline" size="sm">
                  {content[language].readMore}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">{content[language].title}</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
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
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'table')}>
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

      <Tabs value={viewMode}>
        <TabsContent value="grid">
          {paginatedNews.length > 0 ? (
            <GridView />
          ) : (
            <p className="text-center text-muted-foreground">{content[language].noResults}</p>
          )}
        </TabsContent>
        <TabsContent value="table">
          {paginatedNews.length > 0 ? (
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
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

