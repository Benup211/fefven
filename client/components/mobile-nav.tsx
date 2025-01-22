"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage, languages, Language } from "@/contexts/language-context";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const navItems = {
    en: [
        { title: "Home", href: "/" },
        {
            title: "Executive Members",
            href: "/members",
            subItems: [
                { title: "Federation", href: "/member/federation" },
                { title: "Provincial", href: "/member/province" },
                { title: "District", href: "/member/district" },
            ],
        },
        {title: "About",href: "/about"},
        { title: "Resources", href: "/resources" },
        { title: "Events", href: "/events" },
        { title: "Gallery", href: "/gallery" },
        { title: "News", href: "/news" },
        { title: "Contact", href: "/contact" },
    ],
    ne: [
        { title: "गृहपृष्ठ", href: "/" },
        {
            title: "कार्य समिति",
            href: "/members",
            subItems: [
                { title: "महासंघ", href: "/member/federation" },
                { title: "प्रदेश", href: "/member/province" },
                { title: "जिल्ला", href: "/member/district" },
            ],
        },
        {title: "हाम्रोबारे",href: "/about",},
        { title: "स्रोतहरू", href: "/resources" },
        { title: "कार्यक्रमहरू", href: "/events" },
        { title: "ग्यालरी", href: "/gallery" },
        { title: "समाचार", href: "/news" },
        { title: "सम्पर्क", href: "/contact" },
    ],
};

export function MobileNav() {
    const [open, setOpen] = React.useState(false);
    const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();

    const toggleSubMenu = (href: string) => {
        setOpenSubMenu(openSubMenu === href ? null : href);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>
                        {language === "en" ? "Menu" : "मेनु"}
                    </SheetTitle>
                    <SheetDescription>
                        {language === "en"
                            ? "Select an option from the menu."
                            : "मेनु विकल्प"}
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                    <div className="flex flex-col space-y-4">
                        {navItems[language].map((item) => (
                            <div key={item.href}>
                                {item.subItems ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                toggleSubMenu(item.href)
                                            }
                                            className="flex w-full items-center justify-between text-sm font-medium transition-colors text-gray-500 hover:text-primary"
                                        >
                                            {item.title}
                                            {openSubMenu === item.href ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </button>
                                        {openSubMenu === item.href && (
                                            <div className="mt-2 ml-4 flex flex-col space-y-2">
                                                {item.subItems.map(
                                                    (subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            className={`text-sm transition-colors hover:text-primary ${
                                                                pathname ===
                                                                subItem.href
                                                                    ? "text-primary"
                                                                    : "text-muted-foreground"
                                                            }`}
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`text-sm font-medium transition-colors hover:text-primary ${
                                            pathname === item.href
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 space-y-4">
                        <Select
                            value={language}
                            onValueChange={(value) =>
                                setLanguage(value as Language)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem
                                        key={lang.code}
                                        value={lang.code}
                                    >
                                        {lang.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="w-full" variant="default" size="sm">
                            {language === "en"
                                ? "Contact Us"
                                : "सम्पर्क गर्नुहोस्"}
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
