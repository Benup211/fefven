import { useLanguage } from "@/contexts/language-context";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import useUserResourceStore from "@/state/user/resource-store";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function ResourceSection() {
    const { language } = useLanguage();
    const { resources, fetchResources } = useUserResourceStore();
    const isFetched = useRef(false);
    const [items, setItems] = useState<
        { fileUrl: string; title: string; description: string }[]
    >([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchResources();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchResources]);

    useEffect(() => {
        setItems(resources);
    }, [resources]);

    if (loadingData) {
        return (
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="text-primary text-xl flex items-center">
                        <Skeleton className="h-5 w-5 mr-2" />
                        <Skeleton className="h-6 w-3/4" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        );
    }
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                    {language === "en" ? "Resources" : "स्रोतहरू"}
                </h2>
                {items.length <1 ? (
                    <div className="text-center w-full text-primary underline text-xl">
                        {language === "en"
                            ? "Resources are not available"
                            : "कुनै स्रोतहरू उपलब्ध छैनन्"}
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.slice(0, 3).map((resource, index) => (
                                <Card
                                    key={index}
                                    className="flex flex-col h-full"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-primary text-xl flex items-center">
                                            <FileText className="mr-2 h-5 w-5" />
                                            {resource.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground">
                                            {resource.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link
                                            href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/files/${resource.fileUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full"
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                {language === "en"
                                                    ? "Download"
                                                    : "डाउनलोड"}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/resources">
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    {language === "en"
                                        ? "View All Resources"
                                        : "सबै स्रोतहरू हेर्नुहोस्"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
