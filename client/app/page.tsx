"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Download, FileText } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

// Import slick carousel styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
}

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

const resourcesData = {
  en: [
    { title: "Annual Report 2022", description: "Detailed report of FFVEN activities and achievements in 2022", url: "/documents/annual-report-2022.pdf" },
    { title: "Membership Guidelines", description: "Information on how to become a member of FFVEN", url: "/documents/membership-guidelines.pdf" },
    { title: "Export Procedures", description: "Step-by-step guide for exporting fruits and vegetables", url: "/documents/export-procedures.pdf" },
    { title: "Quality Standards", description: "FFVEN quality standards for fruits and vegetables", url: "/documents/quality-standards.pdf" },
    { title: "Market Analysis 2023", description: "Analysis of the current fruit and vegetable market in Nepal", url: "/documents/market-analysis-2023.pdf" },
  ],
  ne: [
    { title: "वार्षिक प्रतिवेदन २०२२", description: "२०२२ मा FFVEN का गतिविधिहरू र उपलब्धिहरूको विस्तृत प्रतिवेदन", url: "/documents/annual-report-2022.pdf" },
    { title: "सदस्यता दिशानिर्देश", description: "FFVEN को सदस्य कसरी बन्ने बारे जानकारी", url: "/documents/membership-guidelines.pdf" },
    { title: "निर्यात प्रक्रियाहरू", description: "फलफूल र तरकारी निर्यात गर्नको लागि चरणबद्ध मार्गदर्शन", url: "/documents/export-procedures.pdf" },
    { title: "गुणस्तर मापदण्डहरू", description: "फलफूल र तरकारीको लागि FFVEN गुणस्तर मापदण्डहरू", url: "/documents/quality-standards.pdf" },
    { title: "बजार विश्लेषण २०२३", description: "नेपालमा हालको फलफूल र तरकारी बजारको विश्लेषण", url: "/documents/market-analysis-2023.pdf" },
  ]
}

export default function Home() {
  const { language } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden">
        <Slider {...sliderSettings}>
          {slides[language].map((slide, index) => (
            <div key={index} className="relative h-[600px]">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill 
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            {language === 'en' ? 'Resources' : 'स्रोतहरू'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData[language].map((resource, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-primary text-xl flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Download' : 'डाउनलोड'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/resources">
              <Button variant="default" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                {language === 'en' ? 'View All Resources' : 'सबै स्रोतहरू हेर्नुहोस्'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {language === 'en' ? 'Recent News' : 'ताजा समाचार'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems[language].map((item, index) => (
              <Card key={index} className="flex flex-col">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-accent hover:bg-accent hover:text-accent-foreground">
                    {language === 'en' ? 'Read More' : 'थप पढ्नुहोस्'} <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="default" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              {language === 'en' ? 'View All News' : 'सबै समाचार हेर्नुहोस्'}
            </Button>
          </div>
        </div>
      </section>

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

