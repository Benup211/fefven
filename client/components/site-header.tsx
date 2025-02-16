"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { useLanguage, languages, Language } from "@/contexts/language-context";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname,useRouter } from 'next/navigation'


const organizationName = {
    en: "FEFVEN",
    ne: "FEFVEN",
};

export function SiteHeader() {
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname()
    const route=useRouter()

    if (pathname.startsWith('/admin')) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center space-x-2 mr-6">
                    <Image src="/fefven.png" width={48} height={48} alt="fefven icon" />
                    <span className="font-bold text-xl text-primary">
                        {organizationName[language]}
                    </span>
                </Link>
                <div className="hidden lg:flex lg:flex-1">
                    <MainNav />
                </div>
                <div className="flex items-center space-x-4 ml-auto">
                    <div className="hidden lg:flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    {
                                        languages.find(
                                            (lang) => lang.code === language
                                        )?.name
                                    }
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() =>
                                            setLanguage(lang.code as Language)
                                        }
                                    >
                                        {lang.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={()=>{route.push('/contact')}}
                        >
                            {language === "en"
                                ? "Contact Us"
                                : "सम्पर्क गर्नुहोस्"}
                        </Button>
                    </div>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
