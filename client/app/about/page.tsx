'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">नेपाल फलफूल तथा तरकारी व्यवसायी महासंघ (FEFVEN)</h1>
        <p className="text-lg text-gray-600">
          नेपालभरका फलफूल तथा तरकारी व्यवसायीहरूको केन्द्रीय संगठन, जो व्यवसायको दिगो विकास र व्यवसायीहरूको हकहितको संरक्षणमा समर्पित छ।
        </p>
      </section>

      <Separator />

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">हाम्रो उद्देश्य</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>फलफूल तथा तरकारी क्षेत्रको दिगो विकास।</li>
              <li>व्यवसायमैत्री वातावरण निर्माण।</li>
              <li>निर्यात प्रवर्द्धन र बजार विस्तार।</li>
              <li>आधुनिक कृषि प्रविधिको उपयोग।</li>
              <li>व्यवसायीहरूको हकहितको संरक्षण।</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">हाम्रो प्रतिबद्धता</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>कृषि क्षेत्रको प्रतिस्पर्धात्मकता वृद्धि।</li>
              <li>स्थानीय उत्पादनलाई अन्तर्राष्ट्रिय बजारमा प्रवर्द्धन।</li>
              <li>व्यवसायीहरूको क्षमता अभिवृद्धिका लागि तालिम।</li>
              <li>जैविक उत्पादनको प्रोत्साहन।</li>
              <li>दिगो कृषि प्रणालीको विकास।</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Global Perspective Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">वैश्विक दृष्टिकोण र नेपालको अवसर</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              जैविक उत्पादनहरूको बढ्दो मागले नेपाललाई अन्तर्राष्ट्रिय बजारमा प्रतिस्पर्धात्मक बनाउन ठूलो अवसर प्रदान गरेको छ। दक्षिण एशियाली क्षेत्रीय सहयोग संगठन (SAARC) र अन्य व्यापार संझौताहरूले नेपाली उत्पादनको निर्यात प्रवर्द्धन गर्न महत्त्वपूर्ण भूमिका खेल्न सक्छ।
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Leadership Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">कार्यसमिति र नेतृत्व</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              महासंघको कार्यसमितिमा अध्यक्ष, उपाध्यक्ष, महासचिव, कोषाध्यक्ष, र अन्य केन्द्रीय सदस्यहरू समावेश छन्, जसले संगठनको नीति, योजना, र कार्यान्वयनलाई प्रभावकारी बनाउन महत्त्वपूर्ण भूमिका खेल्छन्।
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Call to Action Section */}
      <section className="text-center space-y-4">
        <h3 className="text-lg text-gray-600">
          नेपाल फलफूल तथा तरकारी व्यवसायी महासंघको साथ दिनुहोस् र हाम्रो उद्देश्यमा सहभागी बन्नुहोस्।
        </h3>
        <Link href="/contact">
        <Button className="bg-primary text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-primary/70">
          थप जानकारीको लागि सम्पर्क गर्नुहोस्
        </Button>
        </Link>
      </section>
    </div>
  );
}
