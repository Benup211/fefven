"use client";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import useUserCarouselStore from "@/state/user/carousel-store";

export function CarouselItem() {
    const { language } = useLanguage();
    const { items, fetchItems } = useUserCarouselStore();
    const isFetched = useRef(false);
    const [carouselItems, setCarouselItems] = useState<
        { imageUrl: string; title: string; description: string }[]
    >([]);
    const sliderSettings = {
        dots: true,
        infinite: carouselItems.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            try {
                setLoadingData(true);
                await fetchItems();
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [fetchItems]);

    useEffect(() => {
        setCarouselItems(items);
    }, [items]);

    if (loadingData) {
        return (
            <div className="relative h-[600px]">
                <Skeleton className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 w-full max-w-2xl">
                        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-5/6 mx-auto mb-8" />
                        <Skeleton className="h-12 w-40 mx-auto" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <section className="relative overflow-hidden">
            <Slider {...sliderSettings}>
                {carouselItems.map((item, index) => (
                    <div key={index} className="relative h-[600px]">
                        <Image
                            src={
                                `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${item.imageUrl}` ||
                                "/placeholder.svg"
                            }
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                            quality={100}
                            priority
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {item.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8">
                                    {item.description}
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    {language === "en"
                                        ? "Learn More"
                                        : "थप जान्नुहोस्"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
