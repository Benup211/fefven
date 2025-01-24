"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Download, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import useUserResourceStore from "@/state/user/resource-store";
import { Skeleton } from "@/components/ui/skeleton";


export default function ResourcesPage() {
    const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { resources, fetchResources } = useUserResourceStore();
    const isFetched = useRef(false);
    type ResourceItem = { fileUrl: string; title: string; description: string };
    const [items, setItems] = useState<ResourceItem[]>([]);
    const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchResources();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchResources]);

    useEffect(() => {
        setItems(resources);
    }, [resources]);

    useEffect(() => {
        const checkIfMobile = () =>(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    if(loadingData){
      return(
        <div className="col-span-1 lg:col-span-2">
          <div className="w-[90%] md:w-[80%] mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-60" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-9 w-28" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="cursor-not-allowed opacity-50" />
              </PaginationItem>
              {[...Array(3)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink>
                    <Skeleton className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext className="cursor-not-allowed opacity-50" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          </div>
        </div>
      )
    }

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
        },
    };

    const filteredResources = items.filter(
        (resource) =>
            resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
    const paginatedResources = filteredResources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRowClick = (resource: { fileUrl: string; title: string; description: string; }) => {
        setSelectedResource(resource);
    };

    const ResourceList = () => (
        <div className="col-span-1 lg:col-span-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {content[language].tableHeaders.title}
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            {content[language].tableHeaders.description}
                        </TableHead>
                        <TableHead>
                            {content[language].tableHeaders.actions}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                {paginatedResources.length > 0 ? (
                    <TableBody>
                    {paginatedResources.map((resource, index) => (
                        <TableRow
                            key={index}
                            onClick={() => handleRowClick(resource)}
                            className="cursor-pointer hover:bg-muted/50"
                        >
                            <TableCell>{resource.title}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                {resource.description}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/files/${resource.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Button size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        {content[language].downloadText}
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                ):(
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                <p className="text-xl text-primary mt-5">{language === "en"
                                    ? "No resources found"
                                    : "कुनै स्रोतहरू फेला परेन"}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className={currentPage === 1 ? "disabled" : ""}
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
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            className={
                                currentPage === totalPages ? "disabled" : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );

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
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/files/${selectedResource?.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-[600px] border-none"
                    title={`Preview of ${selectedResource?.title}`}
                />
            </CardContent>
        </Card>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-2 text-primary">
                {content[language].title}
            </h1>
            <p className="text-xl text-center mb-8 text-muted-foreground">
                {content[language].subtitle}
            </p>

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
    );
}
