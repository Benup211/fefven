'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface MissionStatementProps {
  title?: string
  mission: string
  details: string[]
}

function MissionStatement({ title = "Our Mission", mission, details }: MissionStatementProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden shadow-lg border-2 border-green-300">
        <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-600 text-white p-6">
          <motion.div 
            className="flex items-center justify-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Leaf className="w-8 h-8" />
            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-green-50 to-white">
          <motion.p 
            className="text-center text-xl leading-relaxed text-gray-800 font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {mission}
          </motion.p>
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mb-6"
              >
                {details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <Leaf className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group"
              aria-expanded={isExpanded}
              aria-controls="mission-details"
            >
              {isExpanded ? (
                <>
                  <span className="mr-2">Less Details</span>
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                </>
              ) : (
                <>
                  <span className="mr-2">More Details</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function MissionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <MissionStatement 
        mission="Our mission is to cultivate a sustainable future through innovative solutions that harmonize technology with nature. We are committed to empowering individuals and organizations to thrive while preserving and enhancing our planet's precious ecosystems."
        details={[
          "Develop eco-friendly technologies that reduce carbon footprint",
          "Educate and inspire communities about sustainable practices",
          "Partner with organizations to implement green initiatives",
          "Invest in research for renewable energy solutions",
          "Create a workplace culture that prioritizes environmental responsibility"
        ]}
      />
    </div>
  )
}

