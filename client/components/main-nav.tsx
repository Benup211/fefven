"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useLanguage } from "@/contexts/language-context";

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
                { title: "Advisory", href: "/member/advisory" },
            ],
        },
        { title: "Institutional Members", href: "/organizations" },
        {title:"Founding Members",href:"/founders"},
        { title: "Resources", href: "/resources" },
        { title: "Events", href: "/events" },
        { title: "Gallery", href: "/gallery" },
        { title: "News", href: "/news" },
        { title: "Contact", href: "/contact" },
        { title: "About", href: "/about" },
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
                { title: "सल्लाहकार", href: "/member/advisory" },
            ],
        },
        { title: "संस्थागत सदस्यहरू", href: "/organizations" },
        {title:"संस्थापक सदस्यहरू",href:"/founders"},
        { title: "स्रोतहरू", href: "/resources" },
        { title: "कार्यक्रमहरू", href: "/events" },
        { title: "ग्यालरी", href: "/gallery" },
        { title: "समाचार", href: "/news" },
        { title: "सम्पर्क", href: "/contact" },
        { title: "हाम्रोबारे", href: "/about" },
    ],
};

export function MainNav() {
    const { language } = useLanguage();
    const pathname = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {navItems[language].map((item) => (
                    <NavigationMenuItem key={item.href}>
                        {item.subItems ? (
                            <NavigationMenuTrigger className={cn("bg-transparent hover:bg-transparent hover:text-primary focus:text-primary focus:bg-transparent",language!=="en"?"":"text-xs")}>
                                {item.title}
                            </NavigationMenuTrigger>
                        ) : (
                            <Link href={item.href} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={cn(
                                        "block py-2 px-3 text-sm font-medium transition-colors hover:text-accent",
                                        pathname === item.href
                                            ? "text-accent"
                                            : "text-foreground",
                                        language !== "en" ? "text-sm" : "text-xs"
                                    )}
                                >
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        )}
                        {item.subItems && (
                            <NavigationMenuContent>
                                <ul className="grid w-[200px] gap-3 p-4">
                                    {item.subItems.map((subItem) => (
                                        <li key={subItem.href}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={subItem.href}
                                                    className={cn(
                                                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent",
                                                        pathname ===
                                                            subItem.href
                                                            ? "text-accent"
                                                            : "text-foreground"
                                                    )}
                                                >
                                                    <div className="text-sm font-medium leading-none">
                                                        {subItem.title}
                                                    </div>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
