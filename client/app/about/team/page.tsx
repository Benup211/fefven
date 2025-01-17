"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { ChevronDown, ChevronUp, Phone, Facebook, Mail } from "lucide-react";
import Link from "next/link";

const teamMembers = {
    en: {
        present: [
            {
                name: "John Doe",
                designation: "President",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "john.doe@ffven.org.np",
                facebook: "https://facebook.com/johndoe",
            },
            {
                name: "Jane Smith",
                designation: "Vice President",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "jane.smith@ffven.org.np",
                facebook: "https://facebook.com/janesmith",
            },
            {
                name: "Mike Johnson",
                designation: "Secretary",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "mike.johnson@ffven.org.np",
                facebook: "https://facebook.com/mikejohnson",
            },
            {
                name: "Emily Brown",
                designation: "Treasurer",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "emily.brown@ffven.org.np",
                facebook: "https://facebook.com/emilybrown",
            },
        ],
        past: {
            2022: [
                {
                    name: "Robert Wilson",
                    designation: "Former President",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "robert.wilson@ffven.org.np",
                    facebook: "https://facebook.com/robertwilson",
                },
                {
                    name: "Sarah Davis",
                    designation: "Former Vice President",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "sarah.davis@ffven.org.np",
                    facebook: "https://facebook.com/sarahdavis",
                },
            ],
            2021: [
                {
                    name: "David Lee",
                    designation: "Former Secretary",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "david.lee@ffven.org.np",
                    facebook: "https://facebook.com/davidlee",
                },
                {
                    name: "Lisa Taylor",
                    designation: "Former Treasurer",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "lisa.taylor@ffven.org.np",
                    facebook: "https://facebook.com/lisataylor",
                },
            ],
        },
    },
    ne: {
        present: [
            {
                name: "जोन डो",
                designation: "अध्यक्ष",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "john.doe@ffven.org.np",
                facebook: "https://facebook.com/johndoe",
            },
            {
                name: "जेन स्मिथ",
                designation: "उपाध्यक्ष",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "jane.smith@ffven.org.np",
                facebook: "https://facebook.com/janesmith",
            },
            {
                name: "माइक जोनसन",
                designation: "सचिव",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "mike.johnson@ffven.org.np",
                facebook: "https://facebook.com/mikejohnson",
            },
            {
                name: "एमिली ब्राउन",
                designation: "कोषाध्यक्ष",
                photo: "/placeholder.svg?height=300&width=300",
                phone: "+977 98XXXXXXXX",
                email: "emily.brown@ffven.org.np",
                facebook: "https://facebook.com/emilybrown",
            },
        ],
        past: {
            2022: [
                {
                    name: "रोबर्ट विल्सन",
                    designation: "पूर्व अध्यक्ष",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "robert.wilson@ffven.org.np",
                    facebook: "https://facebook.com/robertwilson",
                },
                {
                    name: "सारा डेभिस",
                    designation: "पूर्व उपाध्यक्ष",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "sarah.davis@ffven.org.np",
                    facebook: "https://facebook.com/sarahdavis",
                },
            ],
            2021: [
                {
                    name: "डेभिड ली",
                    designation: "पूर्व सचिव",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "david.lee@ffven.org.np",
                    facebook: "https://facebook.com/davidlee",
                },
                {
                    name: "लिसा टेलर",
                    designation: "पूर्व कोषाध्यक्ष",
                    photo: "/placeholder.svg?height=300&width=300",
                    phone: "+977 98XXXXXXXX",
                    email: "lisa.taylor@ffven.org.np",
                    facebook: "https://facebook.com/lisataylor",
                },
            ],
        },
    },
};

export default function TeamPage() {
    const { language } = useLanguage();
    const [expandedYear, setExpandedYear] = useState<number | null>(null);

    const content = {
        en: {
            title: "Our Team",
            presentMembers: "Present Members",
            pastMembers: "Past Members",
        },
        ne: {
            title: "हाम्रो टीम",
            presentMembers: "वर्तमान सदस्यहरू",
            pastMembers: "पूर्व सदस्यहरू",
        },
    };

    interface Member {
        name: string;
        designation: string;
        photo: string;
        phone: string;
        email: string;
        facebook: string;
    }

    const MemberCard = ({ member }: { member: Member }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative">
                <Image
                    src={member.photo || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                        <Link
                            href={`tel:${member.phone}`}
                            className="text-white hover:text-accent"
                        >
                            <Phone size={24} />
                        </Link>
                        <Link
                            href={`mailto:${member.email}`}
                            className="text-white hover:text-accent"
                        >
                            <Mail size={24} />
                        </Link>
                        <Link
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent"
                        >
                            <Facebook size={24} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-primary">
                    {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.designation}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                {content[language].title}
            </h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                    {content[language].presentMembers}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers[language].present.map((member, index) => (
                        <MemberCard key={index} member={member} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                    {content[language].pastMembers}
                </h2>
                {Object.entries(teamMembers[language].past).map(
                    ([year, members]) => (
                        <div key={year} className="mb-4">
                            <button
                                onClick={() =>
                                    setExpandedYear(
                                        expandedYear === Number(year)
                                            ? null
                                            : Number(year)
                                    )
                                }
                                className="flex items-center justify-between w-full p-4 bg-secondary rounded-lg shadow-md"
                            >
                                <span className="text-lg font-semibold">
                                    {year}
                                </span>
                                {expandedYear === Number(year) ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </button>
                            {expandedYear === Number(year) && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {members.map((member, index) => (
                                        <MemberCard
                                            key={index}
                                            member={member}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                )}
            </section>
        </div>
    );
}
