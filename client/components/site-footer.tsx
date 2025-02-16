"use client";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
const content = {
    en: {
        about: "About Us",
        aboutText:
            "The Federation of Fruits and Vegetable Entrepreneurs Nepal is dedicated to promoting and developing the fruit and vegetable industry in Nepal.",
        quickLinks: "Quick Links",
        otherLinks: "Other Links",
        quickLinksItems: [
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Resources", path: "/resources" },
            { label: "Events", path: "/events" },
            { label: "News", path: "/news" },
            { label: "Contact", path: "/contact" },
        ],
        otherLinksItems: [
            { label: "Ministry of Agriculture and Livestock Development", path: "https://moald.gov.np/" },
            { label: "Department of Agriculture", path: "https://doanepal.gov.np/home" },
        ],
        contact: "Contact Us",
        address: "Kathmandu, Nepal",
        phone: "+977 9851017550",
        email: "info@fefven.com",
        copyright:
            "© 2025 Federation of Fruits and Vegetable Entrepreneurs Nepal. All rights reserved.",
    },
    ne: {
        about: "हाम्रो बारेमा",
        aboutText:
            "फलफूल तथा तरकारी उद्यमी महासंघ नेपाल नेपालमा फलफूल र तरकारी उद्योगको प्रवर्द्धन र विकासका लागि समर्पित छ।",
        quickLinks: "द्रुत लिंकहरू",
        otherLinks: "अन्य लिंकहरू",
        quickLinksItems: [
            { label: "गृहपृष्ठ", path: "/" },
            { label: "हाम्रोबारे", path: "/about" },
            { label: "स्रोतहरू", path: "/resources" },
            { label: "कार्यक्रमहरू", path: "/events" },
            { label: "समाचार", path: "/news" },
            { label: "सम्पर्क", path: "/contact" },
        ],
        otherLinksItems: [
            { label: "कृषि तथा पशुपन्छी विकास मन्त्रालय", path: "https://moald.gov.np/" },
            { label: "कृषि विभाग", path: "https://doanepal.gov.np/ne/" },
        ],
        contact: "सम्पर्क गर्नुहोस्",
        address: "काठमाडौं, नेपाल",
        phone: "+९७७ ९८५१०१७५५०",
        email: "info@fefven.com",
        copyright:
            "© २०२५ फलफूल तथा तरकारी उद्यमी महासंघ नेपाल। सर्वाधिकार सुरक्षित।",
    },
};

export function SiteFooter() {
    const { language } = useLanguage();
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-secondary text-secondary-foreground py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Image src="/fefven.png" width={150} height={150} alt="fefven icon" />
                        <h3 className="font-bold text-lg mb-4 text-primary mt-2">
                            {content[language].about}
                        </h3>
                        <p className="text-sm">{content[language].aboutText}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-primary">
                            {content[language].quickLinks}
                        </h3>
                        <ul className="space-y-2">
                            {content[language].quickLinksItems.map(
                                ({ label, path }) => (
                                    <li key={label}>
                                        <Link
                                            href={path}
                                            className="text-sm hover:text-accent transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-primary">
                            {content[language].otherLinks}
                        </h3>
                        <ul className="space-y-2">
                            {content[language].otherLinksItems.map(
                                ({ label, path }) => (
                                    <li key={label}>
                                        <Link
                                            href={path}
                                            className="text-sm hover:text-accent transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-primary">
                            {content[language].contact}
                        </h3>
                        <address className="not-italic text-sm">
                            <p>{content[language].address}</p>
                            <p>{content[language].phone}</p>
                            <p>{content[language].email}</p>
                        </address>
                        <div className="flex space-x-4 mt-4">
                            <Link
                                href="#"
                                className="text-secondary-foreground hover:text-accent transition-colors"
                            >
                                <Facebook size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="text-secondary-foreground hover:text-accent transition-colors"
                            >
                                <Twitter size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="text-secondary-foreground hover:text-accent transition-colors"
                            >
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-border mt-8 pt-8 text-center text-sm">
                    <p>{content[language].copyright}</p>
                </div>
            </div>
        </footer>
    );
}
