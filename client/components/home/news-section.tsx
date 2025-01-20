import { useLanguage } from "@/contexts/language-context";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import useUserNewsStore from "@/state/user/news-store";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function NewsSection() {
    const { language } = useLanguage();
    const { news, fetchNews } = useUserNewsStore();
    const isFetched = useRef(false);
    const [newsItems, setNewsItems] = useState<
        {
            id: number;
            title: string;
            description: string;
            author: string;
            content: string;
            imageUrl: string;
            createdAt: string;
            updatedAt: string;
        }[]
    >([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchNews();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchNews]);

    useEffect(() => {
        setNewsItems(news);
    }, [news]);

    if (loadingData) {
        return (
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                        <Skeleton className="h-10 w-48 mx-auto" />
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, index) => (
                            <Card key={index} className="flex flex-col">
                                <Skeleton className="w-full h-48" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6" />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-10 w-full" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Skeleton className="h-12 w-40 mx-auto" />
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                    {language === "en" ? "Recent News" : "ताजा समाचार"}
                </h2>
                {newsItems.length === 0 ? (
                    <div className="text-center w-full text-primary underline text-xl">
                        {language === "en"
                            ? "News is not available"
                            : "समाचार उपलब्ध छैन"}
                    </div>
                ) : (
                    <div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {newsItems.slice(0, 3).map((item, index) => (
                                <Card key={index} className="flex flex-col">
                                    <Image
                                        src={
                                            `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${item.imageUrl}` ||
                                            "/placeholder.svg"
                                        }
                                        alt={item.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    <CardHeader>
                                        <CardTitle className="text-primary">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p>{item.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/news/${item.id}`}>
                                            <Button
                                                variant="outline"
                                                className="w-full text-accent hover:bg-accent hover:text-accent-foreground"
                                            >
                                                {language === "en"
                                                    ? "Read More"
                                                    : "थप पढ्नुहोस्"}{" "}
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/news">
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    {language === "en"
                                        ? "View All News"
                                        : "सबै समाचार हेर्नुहोस्"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
