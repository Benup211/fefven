"use client"

import { useState, useEffect } from 'react'
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const resourcesData = {
  en: [
    { title: "Annual Report 2022", description: "Detailed report of FFVEN activities and achievements in 2022", url: "/documents/annual-report-2022.pdf" },
    { title: "Membership Guidelines", description: "Information on how to become a member of FFVEN", url: "/documents/membership-guidelines.pdf" },
    { title: "Export Procedures", description: "Step-by-step guide for exporting fruits and vegetables", url: "/documents/export-procedures.pdf" },
    { title: "Quality Standards", description: "FFVEN quality standards for fruits and vegetables", url: "/documents/quality-standards.pdf" },
    { title: "Market Analysis 2023", description: "Analysis of the current fruit and vegetable market in Nepal", url: "/documents/market-analysis-2023.pdf" },
    { title: "Sustainable Farming Practices", description: "Guide to sustainable farming practices for fruit and vegetable growers", url: "/documents/sustainable-farming.pdf" },
    { title: "Financial Report 2022", description: "Detailed financial report for the year 2022", url: "/documents/financial-report-2022.pdf" },
    { title: "Strategic Plan 2023-2025", description: "FFVEN's strategic plan for the next three years", url: "/documents/strategic-plan-2023-2025.pdf" },
    { title: "Member Directory 2023", description: "Directory of all FFVEN members as of 2023", url: "/documents/member-directory-2023.pdf" },
    { title: "Best Practices in Packaging", description: "Guidelines for packaging fruits and vegetables for export", url: "/documents/packaging-best-practices.pdf" },
  ],
  ne: [
    { title: "वार्षिक प्रतिवेदन २०२२", description: "२०२२ मा FFVEN का गतिविधिहरू र उपलब्धिहरूको विस्तृत प्रतिवेदन", url: "/documents/annual-report-2022.pdf" },
    { title: "सदस्यता दिशानिर्देश", description: "FFVEN को सदस्य कसरी बन्ने बारे जानकारी", url: "/documents/membership-guidelines.pdf" },
    { title: "निर्यात प्रक्रियाहरू", description: "फलफूल र तरकारी निर्यात गर्नको लागि चरणबद्ध मार्गदर्शन", url: "/documents/export-procedures.pdf" },
    { title: "गुणस्तर मापदण्डहरू", description: "फलफूल र तरकारीको लागि FFVEN गुणस्तर मापदण्डहरू", url: "/documents/quality-standards.pdf" },
    { title: "बजार विश्लेषण २०२३", description: "नेपालमा हालको फलफूल र तरकारी बजारको विश्लेषण", url: "/documents/market-analysis-2023.pdf" },
    { title: "दिगो कृषि अभ्यासहरू", description: "फलफूल र तरकारी उत्पादकहरूका लागि दिगो कृषि अभ्यासहरूको मार्गदर्शन", url: "/documents/sustainable-farming.pdf" },
    { title: "वित्तीय प्रतिवेदन २०२२", description: "२०२२ को लागि विस्तृत वित्तीय प्रतिवेदन", url: "/documents/financial-report-2022.pdf" },
    { title: "रणनीतिक योजना २०२३-२०२५", description: "अगामी तीन वर्षको लागि FFVEN को रणनीतिक योजना", url: "/documents/strategic-plan-2023-2025.pdf" },
    { title: "सदस्य निर्देशिका २०२३", description: "२०२३ सम्मका सबै FFVEN सदस्यहरूको निर्देशिका", url: "/documents/member-directory-2023.pdf" },
    { title: "प्याकेजिङमा उत्तम अभ्यासहरू", description: "निर्यातका लागि फलफूल र तरकारी प्याकेजिङका लागि दिशानिर्देशहरू", url: "/documents/packaging-best-practices.pdf" },
  ]
}

export default function ResourcesPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedResource, setSelectedResource] = useState<typeof resourcesData.en[0] | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const content = {
    en: {
      title: "Resources",
      subtitle: "Access our collection of documents and reports",
      searchPlaceholder: "Search resources...",
      downloadText: "Download",
      noPreview: "Select a document to preview",
      backToList: "Back to list",
      tableHeaders: {
        title: "Title",
        description: "Description",
        actions: "Actions",
      },
    },
    ne: {
      title: "स्रोतहरू",
      subtitle: "हाम्रा कागजात र प्रतिवेदनहरूको संग्रहमा पहुँच गर्नुहोस्",
      searchPlaceholder: "स्रोतहरू खोज्नुहोस्...",
      downloadText: "डाउनलोड गर्नुहोस्",
      noPreview: "पूर्वावलोकनको लागि कागजात चयन गर्नुहोस्",
      backToList: "सूचीमा फर्कनुहोस्",
      tableHeaders: {
        title: "शीर्षक",
        description: "विवरण",
        actions: "कार्यहरू",
      },
    }
  }

  const filteredResources = resourcesData[language].filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleRowClick = (resource: typeof resourcesData.en[0]) => {
    setSelectedResource(resource)
  }

  const ResourceList = () => (
    <div className="col-span-1 lg:col-span-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{content[language].tableHeaders.title}</TableHead>
            <TableHead className="hidden md:table-cell">{content[language].tableHeaders.description}</TableHead>
            <TableHead>{content[language].tableHeaders.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedResources.map((resource, index) => (
            <TableRow 
              key={index} 
              onClick={() => handleRowClick(resource)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{resource.title}</TableCell>
              <TableCell className="hidden md:table-cell">{resource.description}</TableCell>
              <TableCell>
                <Link href={resource.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {content[language].downloadText}
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
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
    </div>
  )

  const Preview = () => (
    <Card className="col-span-1 lg:col-span-2">
      <CardContent className="p-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => setSelectedResource(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {content[language].backToList}
        </Button>
        <iframe
          src={`${selectedResource?.url}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-[600px] border-none"
          title={`Preview of ${selectedResource?.title}`}
        />
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary">{content[language].title}</h1>
      <p className="text-xl text-center mb-8 text-muted-foreground">{content[language].subtitle}</p>

      <div className="mb-8 max-w-md mx-auto">
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

      <div className="grid grid-cols-1 gap-8">
        {selectedResource ? <Preview /> : <ResourceList />}
      </div>
    </div>
  )
}

