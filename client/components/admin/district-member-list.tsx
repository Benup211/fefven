"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Search } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useDistrictMembersStore } from "@/state/admin/district-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { nepaliDistricts } from "@/lib/nepaliDistricts";
import { toast } from "@/hooks/use-toast";

function SkeletonRow() {
    return (
        <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b text-center">
                <div className="flex justify-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                </div>
            </td>
            <td className="py-2 px-4 border-b text-center">
                <Skeleton className="h-4 w-24 mx-auto" />
            </td>
            <td className="py-2 px-4 border-b text-center">
                <Skeleton className="h-4 w-24 mx-auto" />
            </td>
            <td className="py-2 px-4 border-b text-center">
                <Skeleton className="h-4 w-24 mx-auto" />
            </td>
            <td className="py-2 px-4 border-b text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
            </td>
            <td className="py-2 px-4 border-b text-center">
                <Skeleton className="h-8 w-8 rounded-full mx-auto" />
            </td>
        </tr>
    );
}

export default function DistrictMembersList() {
    const { members, isLoading, error, fetchMembers, deleteMember } =
        useDistrictMembersStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [districtFilter, setDistrictFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (districtFilter === "all" ||
                districtFilter === "" ||
                member.district === districtFilter)
    );

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            const response = await deleteMember(id);
            if (response.success) {
                toast({
                    title: "Deleted successfully",
                    description: "Member has been deleted successfully",
                });
            } else {
                toast({
                    title: "Failed to delete",
                    description: response.error,
                    variant: "destructive",
                });
            }
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
                    <Input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                        disabled={isLoading}
                    />
                    <Select
                        value={districtFilter}
                        onValueChange={setDistrictFilter}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter by district" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Districts</SelectItem>{" "}
                            {/* Updated SelectItem */}
                            {nepaliDistricts.map((district) => (
                                <SelectItem key={district} value={district}>
                                    {district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSearch} disabled={isLoading}>
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-center">
                                Image
                            </th>
                            <th className="py-2 px-4 border-b text-center">
                                Name
                            </th>
                            <th className="py-2 px-4 border-b text-center">
                                Contact No
                            </th>
                            <th className="py-2 px-4 border-b text-center">
                                Designation
                            </th>
                            <th className="py-2 px-4 border-b text-center">
                                District
                            </th>
                            <th className="py-2 px-4 border-b text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingData ? (
                            Array.from({ length: itemsPerPage }).map(
                                (_, index) => <SkeletonRow key={index} />
                            )
                        ) : paginatedMembers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-2 px-4 border-b text-center"
                                >
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            paginatedMembers.map((member) => (
                                <tr
                                    key={member.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-2 px-4 border-b text-center">
                                        <div className="flex justify-center">
                                            <Image
                                                src={
                                                    `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${member.imageUrl}` ||
                                                    "/placeholder.svg"
                                                }
                                                alt={member.name}
                                                width={50}
                                                height={50}
                                                className="rounded-full object-cover w-12 h-12"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {member.name}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {member.contactNo}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {member.designation}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {member.district}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(member.id)
                                            }
                                            aria-label={`Delete ${member.name}`}
                                            className="hover:bg-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    <Pagination>
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
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                    >
                                        {isLoading ? (
                                            <Skeleton className="h-4 w-4" />
                                        ) : (
                                            index + 1
                                        )}
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
                </div>
            )}
        </div>
    );
}
