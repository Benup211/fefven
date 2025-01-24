"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

// Import slick carousel styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { CarouselItem } from '@/components/home/carousel-item'
import { ResourceSection } from '@/components/home/resource-section'
import { NewsSection } from '@/components/home/news-section'
import Link from 'next/link'

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
          <Link href={'/contact'}><Button size="lg" variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
            {language === 'en' ? 'Become a Member' : 'सदस्य बन्नुहोस्'}
          </Button></Link>
        </div>
      </section>
    </div>
  )
}

