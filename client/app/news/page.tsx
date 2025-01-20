"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Search, Grid, List } from "lucide-react";
import useUserNewsStore from "@/state/user/news-store";
import NewsSkeletonLoader from "@/components/skeleton/news-skeleton";

const itemsPerPage = 6;

export default function NewsPage() {
    const { language } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const { news, fetchNews } = useUserNewsStore();
    const isFetched = useRef(false);
    const [newsItems, setNewsItems] = useState<
        {
            id: number;
            title: string;
            description: string;
            author: string;
            content: string;
            imageUrl: string;
            createdAt: string;
            updatedAt: string;
        }[]
    >([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchNews();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchNews]);

    useEffect(() => {
        setNewsItems(news);
    }, [news]);

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
        },
    };

    const filteredNews = newsItems.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const GridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedNews.map((item) => (
                <Card key={item.id} className="flex flex-col">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${item.imageUrl}` || "/placeholder.svg"}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                        <CardTitle className="text-primary">
                            {item.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-2">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        <p className="line-clamp-3">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/news/${item.id}`} passHref>
                            <Button
                                variant="outline"
                                className="w-full text-accent hover:bg-accent hover:text-accent-foreground"
                            >
                                {content[language].readMore}{" "}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

    const TableView = () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{content[language].tableHeaders.date}</TableHead>
                    <TableHead>
                        {content[language].tableHeaders.title}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        {content[language].tableHeaders.summary}
                    </TableHead>
                    <TableHead>
                        {content[language].tableHeaders.actions}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedNews.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <p className="line-clamp-2">{item.description}</p>
                        </TableCell>
                        <TableCell>
                            <Link href={`/news/${item.id}`} passHref>
                                <Button variant="outline" size="sm">
                                    {content[language].readMore}
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    if(loadingData){
      return <NewsSkeletonLoader/>
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
                {content[language].title}
            </h1>

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
                <Tabs
                    value={viewMode}
                    onValueChange={(value) =>
                        setViewMode(value as "grid" | "table")
                    }
                >
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
                        <p className="text-center text-muted-foreground text-xl underline">
                            {content[language].noResults}
                        </p>
                    )}
                </TabsContent>
                <TabsContent value="table">
                    {paginatedNews.length > 0 ? (
                        <TableView />
                    ) : (
                        <p className="text-center text-muted-foreground text-xl underline">
                            {content[language].noResults}
                        </p>
                    )}
                </TabsContent>
            </Tabs>

            {totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
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
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
