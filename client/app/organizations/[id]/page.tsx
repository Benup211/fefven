"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ArrowLeft,
    UserIcon,
    SearchIcon,
    PhoneIcon,
    BriefcaseIcon,
} from "lucide-react";
import { useOrganizationMemberStore } from "@/state/admin/organization-member-store";
import { useLanguage } from "@/contexts/language-context";

export default function OrganizationDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { members, fetchMembers, Loading, error } =
        useOrganizationMemberStore();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const {language} = useLanguage();

    useEffect(() => {
        const loadMembers = async () => {
            setIsLoading(true);
            await fetchMembers(Number(id));
            setIsLoading(false);
        };
        loadMembers();
    }, [id, fetchMembers]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.designation.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMembers.length / pageSize);
    const paginatedMembers = filteredMembers.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    if (!Loading && error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    const MemberSkeleton = () => (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gray-200 dark:bg-gray-700">
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/organizations")}
                    className="rounded-full"
                >
                    <ArrowLeft className="h-6 w-6" />
                    {language==='en'?"Go Back":"फिर्ता जानुहोस्"}
                </Button>
            </div>
            <div className="flex justify-center items-center mb-6 space-x-2">
                <div className="relative w-full max-w-md">
                    <Input
                        type="text"
                        placeholder={language==='en'?"Search members...":"सदस्यहरू खोज्नुहोस्..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                    />
                    <SearchIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: pageSize }).map((_, index) => (
                        <MemberSkeleton key={index} />
                    ))}
                </div>
            ) : filteredMembers.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    {language==='en'?"No members found":"कुनै सदस्यहरू फेला परेनन्"}
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedMembers.map((member) => (
                            <Card
                                key={member.id}
                                className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                <CardHeader className="bg-primary/80 text-white">
                                    <CardTitle className="flex items-center justify-between text-lg">
                                        <div className="flex items-center">
                                            <UserIcon
                                                className="mr-2"
                                                size={20}
                                            />
                                            {member.name}
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                                        <BriefcaseIcon
                                            className="mr-2"
                                            size={16}
                                        />
                                        <span>{member.designation}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                                        <PhoneIcon className="mr-2" size={16} />
                                        <a href={`tel:${member.contactNo}`}>
                                            <span>{member.contactNo}</span>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filteredMembers.length > pageSize && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                variant="outline"
                                className="px-3 py-2 rounded-full"
                            >
                                &lt;
                            </Button>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((pageNumber) => (
                                <Button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    variant={
                                        pageNumber === page
                                            ? "default"
                                            : "outline"
                                    }
                                    className="px-4 py-2 rounded-full"
                                >
                                    {pageNumber}
                                </Button>
                            ))}
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
            )}
        </div>
    );
}
