"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Download, FileText, Loader, Loader2 } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

// Import slick carousel styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import useUserCarouselStore from '@/state/user/carousel-store'
import { CarouselItem } from '@/components/home/carousel-item'
import { ResourceSection } from '@/components/home/resource-section'
import { NewsSection } from '@/components/home/news-section'

const slides = {
  en: [
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Empowering Nepal's Fruit and Vegetable Industry",
      description: "Join us in our mission to promote sustainable growth and innovation in agriculture.",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Connecting Farmers to Global Markets",
      description: "We provide resources and support to help local farmers reach international consumers.",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Promoting Sustainable Farming Practices",
      description: "Learn about our initiatives to encourage environmentally friendly cultivation methods.",
    },
  ],
  ne: [
    {
      image: "http://localhost:3001/uploads/images/1737215648351-856504548-bg.jpg",
      title: "नेपालको फलफूल र तरकारी उद्योगलाई सशक्त बनाउँदै",
      description: "कृषिमा दिगो विकास र नवीनता प्रवर्द्धन गर्ने हाम्रो मिशनमा सामेल हुनुहोस्।",
    },
    {
      image: "http://localhost:3001/uploads/images/1737215648351-856504548-bg.jpg",
      title: "किसानहरूलाई विश्व बजारसँग जोड्दै",
      description: "हामी स्थानीय किसानहरूलाई अन्तर्राष्ट्रिय उपभोक्तासम्म पुग्न मद्दत गर्न स्रोत र समर्थन प्रदान गर्दछौं।",
    },
    {
      image: "http://localhost:3001/uploads/images/1737215648351-856504548-bg.jpg",
      title: "दिगो कृषि अभ्यासहरूको प्रवर्द्धन",
      description: "वातावरण मैत्री खेती विधिहरूलाई प्रोत्साहन गर्ने हाम्रा पहलहरूको बारेमा जान्नुहोस्।",
    },
  ]
}

const features = {
  en: [
    {
      title: "Industry Advocacy",
      description: "We represent the interests of fruit and vegetable entrepreneurs at national and international levels.",
      icon: "🏛️",
    },
    {
      title: "Market Access",
      description: "We help our members connect with new markets and expand their business opportunities.",
      icon: "🌐",
    },
    {
      title: "Training & Development",
      description: "We offer workshops and seminars to keep our members updated with the latest industry trends and techniques.",
      icon: "📚",
    },
    {
      title: "Quality Standards",
      description: "We promote and help implement international quality standards in fruit and vegetable production.",
      icon: "🏅",
    },
  ],
  ne: [
    {
      title: "उद्योग वकालत",
      description: "हामी राष्ट्रिय र अन्तर्राष्ट्रिय स्तरमा फलफूल र तरकारी उद्यमीहरूको हितको प्रतिनिधित्व गर्दछौं।",
      icon: "🏛️",
    },
    {
      title: "बजार पहुँच",
      description: "हामी हाम्रा सदस्यहरूलाई नयाँ बजारहरूसँग जोड्न र उनीहरूको व्यावसायिक अवसरहरू विस्तार गर्न मद्दत गर्दछौं।",
      icon: "🌐",
    },
    {
      title: "प्रशिक्षण र विकास",
      description: "हामी हाम्रा सदस्यहरूलाई उद्योगका नवीनतम प्रवृत्तिहरू र प्रविधिहरूसँग अद्यावधिक राख्न कार्यशाला र सेमिनारहरू प्रदान गर्दछौं।",
      icon: "📚",
    },
    {
      title: "गुणस्तर मापदण्डहरू",
      description: "हामी फलफूल र तरकारी उत्पादनमा अन्तर्राष्ट्रिय गुणस्तर मापदण्डहरूको प्रवर्द्धन र कार्यान्वयन गर्न मद्दत गर्दछौं।",
      icon: "🏅",
    },
  ]
}

const newsItems = {
  en: [
    {
      title: "New Export Regulations Announced",
      summary: "The government has announced new regulations to boost fruit and vegetable exports.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Annual Mango Festival Success",
      summary: "This year's Mango Festival saw record attendance and sales.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "New Organic Certification Process",
      summary: "A streamlined organic certification process has been introduced for farmers.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  ne: [
    {
      title: "नयाँ निर्यात नियमहरू घोषणा",
      summary: "सरकारले फलफूल र तरकारी निर्यात बढाउन नयाँ नियमहरू घोषणा गरेको छ।",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "वार्षिक आँप महोत्सव सफलता",
      summary: "यस वर्षको आँप महोत्सवमा रेकर्ड उपस्थिति र बिक्री देखियो।",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "नयाँ जैविक प्रमाणीकरण प्रक्रिया",
      summary: "किसानहरूका लागि सरलीकृत जैविक प्रमाणीकरण प्रक्रिया शुरू गरिएको छ।",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]
}


export default function Home() {
  const { language } = useLanguage()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <CarouselItem/>
      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {language === 'en' ? 'What We Offer' : 'हामी के प्रदान गर्दछौं'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features[language].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <ResourceSection/>

      {/* Recent News Section */}
      <NewsSection/>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Join Our Federation' : 'हाम्रो महासंघमा सामेल हुनुहोस्'}
          </h2>
          <p className="text-xl mb-8">
            {language === 'en' 
              ? 'Become a part of Nepal\'s leading fruit and vegetable industry network' 
              : 'नेपालको अग्रणी फलफूल र तरकारी उद्योग नेटवर्कको हिस्सा बन्नुहोस्'}
          </p>
          <Button size="lg" variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
            {language === 'en' ? 'Become a Member' : 'सदस्य बन्नुहोस्'}
          </Button>
        </div>
      </section>
    </div>
  )
}

