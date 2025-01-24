"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { filterMembers } from "@/lib/user-filter-member";
import Image from "next/image";
import type { Member } from "@/lib/types";
import { motion } from "framer-motion";
import { useUserFederationMembersStore } from "@/state/user/federation-store";
import { useLanguage } from "@/contexts/language-context";

export function FederationMembersClient() {
    const {language}=useLanguage()
    const [searchTerm, setSearchTerm] = useState("");
    const { presentMembers, pastMembers, error, fetchMembers } =
        useUserFederationMembersStore();

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

    const filteredPresentMembers = filterMembers(presentMembers, searchTerm);
    const filteredPastMembers = filterMembers(pastMembers, searchTerm);

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="max-w-md mx-auto mb-8">
                <Input
                    type="search"
                    placeholder={language === 'en' ? "Search Federation Executive Committee..." : "महासंघ कार्य समिति खोज्नुहोस्..."} 
                    className="w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {loadingData ? (
                <SkeletonLoading />
            ) : (
                <>
                    <MemberSection
                        title={language==='en'?"Present Members":"तात्कालीन सदस्यहरू"}
                        members={filteredPresentMembers}
                    />
                    <MemberSection
                        title={language==='en'?"Past Members":"पूर्व सदस्यहरू"}
                        members={filteredPastMembers}
                        isPastMember={true}
                    />
                </>
            )}
        </div>
    );
}

function SkeletonLoading() {
    return (
        <div className="space-y-12">
            {[1, 2].map((section) => (
                <div key={section} className="mb-12">
                    <Skeleton className="w-48 h-8 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((card) => (
                            <Card key={card} className="overflow-hidden">
                                <Skeleton className="w-full aspect-video" />
                                <CardContent className="p-6">
                                    <Skeleton className="w-3/4 h-6 mb-2" />
                                    <Skeleton className="w-1/2 h-4 mb-3" />
                                    <Skeleton className="w-full h-4 mb-2" />
                                    <Skeleton className="w-3/4 h-4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function MemberSection({
    title,
    members,
    isPastMember = false,
}: {
    title: string;
    members: Member[];
    isPastMember?: boolean;
}) {
    const {language}=useLanguage()

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {members.length === 0 ?(
                    <div className="text-red-500">{language === 'en' ? "No Present/Past Members Found" : "कुनै तात्कालीन/पूर्व सदस्य फेला परेनन्"}</div>
                ):(
                members.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <MemberCard
                            member={member}
                            isPastMember={isPastMember}
                        />
                    </motion.div>
                ))
                )}
            </div>
        </div>
    );
}

function MemberCard({
    member,
    isPastMember,
}: {
    member: Member;
    isPastMember: boolean;
}) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-video relative">
                <Image
                    src={
                        `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${member.imageUrl}` ||
                        "/placeholder.svg"
                    }
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    width={400}
                    height={400}
                />
                <Badge
                    variant={
                        member.enrollmentStatus === "PRESENT"
                            ? "default"
                            : "secondary"
                    }
                    className="absolute top-3 right-3 text-xs font-semibold px-2 py-1"
                >
                    {member.enrollmentStatus}
                </Badge>
            </div>
            <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {member.name}
                </h3>
                <p className="text-gray-600 mb-3">{member.designation}</p>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                    </svg>
                    <a href={`tel:${member.contactNo}`}>{member.contactNo}</a>
                </p>
                {isPastMember && (
                    <div className="text-sm text-gray-500">
                        <p className="flex items-center mb-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            Start:{" "}
                            {new Date(member.startDate).toLocaleDateString()}
                        </p>
                        <p className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            End: {new Date(member.endDate).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
