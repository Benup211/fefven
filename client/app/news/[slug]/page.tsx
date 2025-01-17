"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

type NewsArticle = {
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
};

type NewsArticles = {
  [key: string]: NewsArticle;
};

// This would typically come from an API call
const getNewsArticle = (slug: string): NewsArticle | null => {
  // Mock data - in a real app, this would fetch from an API
  const newsArticles: NewsArticles = {
    'new-export-regulations': {
      title: "New Export Regulations Announced",
      content: "The government has announced new regulations to boost fruit and vegetable exports. These changes aim to simplify the export process and open up new markets for Nepali produce. The new regulations include streamlined documentation processes, reduced export fees, and incentives for farmers who meet international quality standards. This move is expected to significantly increase Nepal's agricultural exports in the coming years.",
      date: "2023-09-15",
      author: "John Doe",
      image: "/placeholder.svg?height=400&width=800"
    },
    'annual-mango-festival-success': {
      title: "Annual Mango Festival Success",
      content: "This year's Mango Festival saw record attendance and sales. Farmers from across Nepal showcased over 50 varieties of mangoes, attracting both local and international buyers. The festival, held in Kathmandu, featured mango tasting sessions, culinary demonstrations, and seminars on mango cultivation techniques. Exports deals worth millions of rupees were signed during the event, marking a significant boost for Nepal's mango industry.",
      date: "2023-06-20",
      author: "Jane Smith",
      image: "/placeholder.svg?height=400&width=800"
    },
  }
  return newsArticles[slug] || null
}

export default function NewsArticlePage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [article, setArticle] = useState<NewsArticle | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const fetchedArticle = await getNewsArticle(params.slug as string)
      setArticle(fetchedArticle)
    }
    fetchArticle()
  }, [params.slug])

  const content = {
    en: {
      backToNews: "Back to News",
      publishedOn: "Published on",
      by: "by",
      notFound: "Article not found",
    },
    ne: {
      backToNews: "समाचारमा फर्कनुहोस्",
      publishedOn: "प्रकाशित मिति",
      by: "द्वारा",
      notFound: "लेख फेला परेन",
    }
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{content[language].notFound}</h1>
        <Button onClick={() => router.push('/news')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {content[language].backToNews}
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push('/news')} className="text-primary hover:text-primary/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {content[language].backToNews}
        </Button>
        <p className="text-sm text-muted-foreground">
          {content[language].publishedOn} {new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP')} {content[language].by} {article.author}
        </p>
      </div>
      <Card className="overflow-hidden">
        <div className="relative h-[400px] w-full">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-primary">{article.title}</h1>
          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-lg leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

