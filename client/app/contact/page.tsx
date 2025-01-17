"use client"

import { useState } from 'react'
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

const content = {
  en: {
    title: "Contact Us",
    subtitle: "Get in touch with us",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send Message",
    address: "Kathmandu, Nepal",
    phone: "+977 1 4444444",
    emailAddress: "info@ffven.org.np",
    formSuccess: "Thank you for your message. We'll get back to you soon!",
    contactInfo: "Contact Information",
    location: "Our Location",
  },
  ne: {
    title: "सम्पर्क गर्नुहोस्",
    subtitle: "हामीलाई सम्पर्क गर्नुहोस्",
    name: "नाम",
    email: "इमेल",
    message: "सन्देश",
    submit: "सन्देश पठाउनुहोस्",
    address: "काठमाडौं, नेपाल",
    phone: "+९७७ १ ४४४४४४४",
    emailAddress: "info@ffven.org.np",
    formSuccess: "तपाईंको सन्देशको लागि धन्यवाद। हामी चाँडै तपाईंलाई जवाफ दिनेछौं!",
    contactInfo: "सम्पर्क जानकारी",
    location: "हाम्रो स्थान",
  },
}

export default function ContactPage() {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast({
      title: content[language].formSuccess,
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary">{content[language].title}</h1>
      <p className="text-xl text-center mb-12 text-muted-foreground">{content[language].subtitle}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>{content[language].contactInfo}</CardTitle>
            <CardDescription>Feel free to reach out to us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="text-primary" size={24} />
              <p>{content[language].address}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-primary" size={24} />
              <p>{content[language].phone}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="text-primary" size={24} />
              <p>{content[language].emailAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {content[language].name}
                </label>
                <Input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {content[language].email}
                </label>
                <Input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {content[language].message}
                </label>
                <Textarea id="message" name="message" rows={4} required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {content[language].submit}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>{content[language].location}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625951286!2d85.29111324961035!3d27.70895594444576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1620764429224!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy"
              title="FFVEN Location Map"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

