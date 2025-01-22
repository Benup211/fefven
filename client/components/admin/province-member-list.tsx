"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useProvinceStore } from "@/state/admin/province-store";
import { ProvinceSkeletonRow } from "../skeleton/province-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import {toast} from "@/hooks/use-toast"

export default function ProvinceMembersList() {
    const { members, isLoading, error, fetchMembers, deleteMember } =
        useProvinceStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProvince, setSelectedProvince] = useState<string>("all");
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

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedProvince === "all" ||
                member.province.toString() === selectedProvince)
    );

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            const response=await deleteMember(id)
      if(response.success){
        toast({
          title: "Deleted successfully",
          description: "Member has been deleted successfully",
        })
      }else{
        toast({
          title: "Failed to delete",
          description: response.error,
          variant: "destructive",
        });
        }}
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                        disabled={isLoading}
                    />
                    <Select
                        value={selectedProvince}
                        onValueChange={setSelectedProvince}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by province" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Provinces</SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7].map((province) => (
                                <SelectItem
                                    key={province}
                                    value={province.toString()}
                                >
                                    Province {province}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                                Province
                            </th>
                            <th className="py-2 px-4 border-b text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingData
                            ? Array.from({ length: itemsPerPage }).map(
                                  (_, index) => (
                                      <ProvinceSkeletonRow key={index} />
                                  )
                              )
                            : paginatedMembers.length===0?(
                                <tr>
                                <td colSpan={6} className="py-2 px-4 border-b text-center">
                                    No data found
                                </td>
                            </tr>
                            ):(
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
                                            {member.province}
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
