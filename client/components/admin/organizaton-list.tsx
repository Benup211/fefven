"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, SearchIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useOrganizationStore } from "@/state/admin/organization-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function OrganizationList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 12;
    const router = useRouter();

    const { organizations, fetchOrganizations, deleteOrganization,Loading,error} =
        useOrganizationStore();

    useEffect(() => {
        const loadOrganizations = async () => {
            setIsLoading(true);
            await fetchOrganizations();
            setIsLoading(false);
        };
        loadOrganizations();
    }, [fetchOrganizations]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const filteredOrganizations = organizations.filter((org) =>
        org.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOrganizations.length / pageSize);
    const paginatedOrganizations = filteredOrganizations.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const handleDelete = async(e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (
            window.confirm("Are you sure you want to delete this organization?")
        ) {
            const response=await deleteOrganization(id);
            if(response.success){
                toast({
                    title: "Organization Deleted",
                    description: "Organization has been successfully deleted",
                });
            }else{
                toast({
                    title: "Organization Deletion Failed",
                    description: response.error,
                    variant: "destructive",
                });
            }
        }
    };

    const handleCardClick = (id: number) => {
        router.push(`/admin/organization/${id}`);
    };

    const OrganizationSkeleton = () => (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gray-200 dark:bg-gray-700">
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );

    if(!Loading && error)return <div className="text-red-500">{error}</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-center items-center mb-6 space-x-2">
                <div className="relative w-full max-w-md">
                    <Input
                        type="text"
                        placeholder="Search organizations/members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                    />
                    <SearchIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
                <Link href="/admin/organization/new" passHref>
                    <Button className="rounded-full p-2 w-10 h-10 flex items-center justify-center">
                        <PlusIcon size={20} />
                    </Button>
                </Link>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: pageSize }).map((_, index) => (
                        <OrganizationSkeleton key={index} />
                    ))}
                </div>
            ) : filteredOrganizations.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    No Institutional Members found
                </div>
            ) : (
                <div className="md:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {paginatedOrganizations.map((org) => (
                        <Card
                            key={org.id}
                            className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                            onClick={() => handleCardClick(org.id)}
                        >
                            <CardHeader className="bg-primary/80 text-white">
                                <CardTitle className="text-lg font-semibold truncate">
                                    {org.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center">
                                        <CalendarIcon
                                            className="mr-2"
                                            size={16}
                                        />
                                        <span>
                                            Established: {org.establishedAt}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => handleDelete(e, org.id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                                    >
                                        <Trash2Icon size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {!isLoading && filteredOrganizations.length > 0 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <Button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        variant="outline"
                        className="px-3 py-2 rounded-full"
                    >
                        &lt;
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNumber) => (
                            <Button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                variant={
                                    pageNumber === page ? "default" : "outline"
                                }
                                className="px-4 py-2 rounded-full"
                            >
                                {pageNumber}
                            </Button>
                        )
                    )}
                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        variant="outline"
                        className="px-3 py-2 rounded-full"
                    >
                        &gt;
                    </Button>
                </div>
            )}
        </div>
    );
}
