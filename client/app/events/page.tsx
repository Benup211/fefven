"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
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
import { Calendar, MapPin, Search, Grid, List, ArrowUp } from "lucide-react";
import { EventDetails } from "@/components/events/event-details";
import useUserEventStore from "@/state/user/event-store";
import { EventListSkeleton } from "@/components/skeleton/events-skeleton";

const itemsPerPage = 6;

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
    organizerWebsite?: string;
    createdAt: string;
    updatedAt: string;
}

export default function EventsPage() {
    const { language } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const isFetched = useRef(false);
    const { events, fetchEvents } = useUserEventStore();
    const [eventsItem, setEventsItem] = useState<Event[]>([]);

    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchEvents();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchEvents]);

    useEffect(() => {
        setEventsItem(events);
    }, [events]);

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
        },
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if(loadingData) {
        return <EventListSkeleton/>
    }

    const filteredEvents = eventsItem.filter(
        (event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const GridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedEvents.map((event) => (
                <Card
                    key={event.id}
                    className="flex flex-col h-full"
                    onClick={() => setSelectedEvent(event)}
                >
                    <CardHeader>
                        <CardTitle className="text-primary">
                            {event.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-2 flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />{" "}
                            {event.startDate}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2 flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />{" "}
                            {event.venueName}, {event.city}
                        </p>
                        <p className="line-clamp-3">{event.description}</p>
                    </CardContent>
                    <CardFooter className="justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            {event.category}
                        </p>
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
                        {content[language].tableHeaders.location}
                    </TableHead>
                    <TableHead>
                        {content[language].tableHeaders.actions}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedEvents.map((event) => (
                    <TableRow key={event.id}>
                        <TableCell>{event.startDate}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            {event.venueName}, {event.city}
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedEvent(event)}
                            >
                                {content[language].viewDetails}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
                {content[language].title}
            </h1>

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
                <Tabs
                    value={viewMode}
                    onValueChange={(value: string) =>
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

            <Tabs
                value={viewMode}
                onValueChange={(value: string) =>
                    setViewMode(value as "grid" | "table")
                }
            >
                <TabsContent value="grid">
                    {paginatedEvents.length > 0 ? (
                        <GridView />
                    ) : (
                        <p className="text-center text-muted-foreground">
                            {content[language].noResults}
                        </p>
                    )}
                </TabsContent>
                <TabsContent value="table">
                    {paginatedEvents.length > 0 ? (
                        <TableView />
                    ) : (
                        <p className="text-center text-muted-foreground">
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
            )}

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <EventDetails
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                </div>
            )}

            {showBackToTop && (
                <Button
                    className="fixed bottom-4 right-4 rounded-full"
                    onClick={scrollToTop}
                    size="icon"
                >
                    <ArrowUp className="h-4 w-4" />
                    <span className="sr-only">
                        {content[language].backToTop}
                    </span>
                </Button>
            )}
        </div>
    );
}
