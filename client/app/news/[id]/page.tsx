"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import useUserNewsStore from "@/state/user/news-store";
import { useLanguage } from "@/contexts/language-context";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsProps {
    id: number;
    title: string;
    description: string;
    author: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export default function NewsArticlePage() {
    const params = useParams();
    const router = useRouter();
    const { getNewsById, gotNews } = useUserNewsStore();
    const [article, setArticle] = useState<NewsProps | null>(null);
    const isFetched = useRef(false);
    const [loadingData, setLoadingData] = useState(true);
    const { language } = useLanguage();
    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                const newId = parseInt(params.id as string);
                await getNewsById(newId);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [getNewsById, params.id]);

    useEffect(() => {
        setArticle(gotNews);
    }, [gotNews]);

    if (loadingData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        className="text-primary hover:underline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                    </Button>
                    <Skeleton className="h-4 w-48" />
                </div>
                <Card className="overflow-hidden">
                    <div className="relative h-[400px] w-full">
                        <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-8">
                        <Skeleton className="h-10 w-3/4 mb-6" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">
                    {language === "en" ? "Article not found" : "लेख फेला परेन"}
                </h1>
                <Button onClick={() => router.push("/news")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === "en" ? "Back to News" : "समाचारमा फर्कनुहोस्"}
                </Button>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/news")}
                    className="text-primary hover:underline"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === "en" ? "Back to News" : "समाचारमा फर्कनुहोस्"}
                </Button>
                <p className="text-sm text-muted-foreground">
                    Published on{" "}
                    {new Date(article.createdAt).toLocaleDateString()} by{" "}
                    {article.author}
                </p>
            </div>
            <Card className="overflow-hidden">
                <div className="relative h-[400px] w-full">
                    <Image
                        src={
                            `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${article.imageUrl}` ||
                            "/placeholder.svg"
                        }
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                <CardContent className="p-8">
                    <h1 className="text-4xl font-bold mb-6 text-primary">
                        {article.title}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="prose max-w-none"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
