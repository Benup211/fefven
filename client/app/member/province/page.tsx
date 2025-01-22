"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { Search, Phone, MapPin, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import useProvinceStore from "@/state/user/province-store";
import {
    UserProvinceCardSkeleton,
    UserProvinceListItemSkeleton,
} from "@/components/skeleton/user-province-skeleton";
import { useLanguage } from "@/contexts/language-context";

const MotionCard = motion(Card);

export default function ProvinceMembers() {
    const { language } = useLanguage();
    const ITEMS_PER_PAGE = 10;
    const NO_MEMBERS_MESSAGE = language === 'en' ? "No member found" : "कुनै सदस्य फेला परेनन्";
    const SKELETON_COUNT = 10;
    const { members, isLoading, error, fetchMembers } = useProvinceStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProvince, setSelectedProvince] = useState<
        string | undefined
    >();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);

    const isFetched = useRef(false);

    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchMembers();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchMembers]);

    const filteredMembers = members.filter(
        (member) =>
            (selectedProvince
                ? member.province.toString() === selectedProvince
                : true) &&
            (searchTerm === "" ||
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.designation
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                member.contactNo.includes(searchTerm))
    );

    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleProvinceChange = (province: string) => {
        setSelectedProvince(province === "all" ? undefined : province);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const renderPagination = () => {
        if (
            filteredMembers.length === 0 ||
            filteredMembers.length <= ITEMS_PER_PAGE
        )
            return null;

        return (
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => Math.max(prev - 1, 1));
                            }}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === index + 1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(index + 1);
                                }}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                );
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    };

    const renderContent = () => {
        if (loadingData) {
            return viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(SKELETON_COUNT)].map((_, index) => (
                        <UserProvinceCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {[...Array(SKELETON_COUNT)].map((_, index) => (
                        <UserProvinceListItemSkeleton key={index} />
                    ))}
                </div>
            );
        }

        if (error) {
            return <div className="text-center text-red-500 py-8">{error}</div>;
        }

        if (filteredMembers.length === 0) {
            return (
                <div className="text-center text-gray-500 py-8">
                    {NO_MEMBERS_MESSAGE}
                </div>
            );
        }

        return viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedMembers.map((member, index) => (
                    <MotionCard
                        key={member.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="aspect-video relative">
                            <img
                                src={
                                    `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${member.imageUrl}` ||
                                    "/placeholder.svg"
                                }
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-primary">
                                {member.name}
                            </h2>
                            <Badge variant="secondary" className="mb-2">
                                {member.designation}
                            </Badge>
                            <p className="text-sm text-gray-600 mb-1 flex items-center">
                                <Phone size={16} className="mr-2" />{" "}
                                <a href={`tel:${member.contactNo}`}>{member.contactNo}</a>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <MapPin size={16} className="mr-2" /> Province{" "}
                                {member.province}
                            </p>
                        </CardContent>
                    </MotionCard>
                ))}
            </div>
        ) : (
            <div className="space-y-4">
                {paginatedMembers.map((member, index) => (
                    <MotionCard
                        key={member.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <CardContent className="p-4 flex items-center">
                            <div className="w-16 h-16 relative mr-4">
                                <Image
                                    src={
                                        `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${member.imageUrl}` ||
                                        "/placeholder.svg"
                                    }
                                    alt={member.name}
                                    objectFit="cover"
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover w-16 h-16"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-1 text-primary">
                                    {member.name}
                                </h2>
                                <Badge variant="secondary" className="mb-1">
                                    {member.designation}
                                </Badge>
                                <p className="text-sm text-gray-600 mb-1 flex items-center">
                                    <Phone size={16} className="mr-2" />{" "}
                                    <a href={`tel:${member.contactNo}`}>{member.contactNo}</a>
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <MapPin size={16} className="mr-2" />{" "}
                                    Province {member.province}
                                </p>
                            </div>
                        </CardContent>
                    </MotionCard>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-primary">
                {language==='en'?"Province Executive Committee":"प्रदेश कार्य समिति"}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
                <div className="flex-grow relative">
                    <Input
                        type="text"
                        placeholder={language === 'en' ? "Search by name, designation, or contact" : "नाम, पद, वा सम्पर्कद्वारा खोज्नुहोस्"}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
                <Select
                    onValueChange={handleProvinceChange}
                    value={selectedProvince || "all"}
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{language==='en'?"All Provinces":"सबै प्रदेशहरू"}</SelectItem>
                        {[1, 2, 3, 4, 5, 6, 7].map((province) => (
                            <SelectItem
                                key={province}
                                value={province.toString()}
                            >
                                {language==='en'?"Province":"प्रदेश"} {province}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) =>
                        setViewMode(value as "grid" | "list")
                    }
                >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                        <Grid className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            {renderContent()}
            {renderPagination()}
        </div>
    );
}
