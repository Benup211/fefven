"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart2, Search, MessageSquare, ChevronDown, ExternalLink, Download } from "lucide-react"

const activities = [
  {
    title: "Market Analysis",
    description:
      "FEFVEN conducts comprehensive market analysis for vegetables in Nepal, providing valuable insights to our members and stakeholders.",
    icon: BarChart2,
    stats: { completed: 50, ongoing: 5 },
  },
  {
    title: "Rapid Market Assessments",
    description:
      "We perform rapid market assessments for vegetables, helping entrepreneurs make informed decisions in a dynamic market environment.",
    icon: Search,
    stats: { completed: 100, ongoing: 10 },
  },
  {
    title: "Advocacy",
    description:
      "FEFVEN actively advocates for the rights and interests of fruit and vegetable entrepreneurs in Nepal, ensuring their voices are heard in policy discussions.",
    icon: MessageSquare,
    stats: { initiatives: 25, successfulCampaigns: 15 },
  },
]

const statements = [
  "The board should be impartial when making decisions about traders in the Kalimati market.",
  "The market administration has weak rules and regulations.",
  "The board should investigate in an unbiased way.",
]

export default function AboutFEFVEN() {
  const [activeTab, setActiveTab] = useState("about")
  const [activeStatement, setActiveStatement] = useState(0)

  const tabContent = {
    about: (
      <motion.div
        key="about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4">About FEFVEN</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 mb-4">
              FEFVEN, the Federation of Fruits and Vegetable Entrepreneurs Nepal, is a prominent organization
              representing fruit and vegetable entrepreneurs across Nepal. Our mission is to support and advocate for
              the interests of our members while contributing to the growth and development of Nepal's agricultural
              sector.
            </p>
            <p className="text-gray-700 mb-4">
              As a leading voice in the industry, FEFVEN plays a crucial role in shaping policies, conducting market
              research, and promoting best practices among fruit and vegetable entrepreneurs.
            </p>
          </div>
          <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-green-800">Our Vision</h4>
            <p className="text-green-700 mb-4">
              "To create a thriving, sustainable, and innovative fruit and vegetable sector in Nepal, empowering
              entrepreneurs and contributing to the nation's economic growth."
            </p>
            <h4 className="text-xl font-semibold mb-2 text-green-800">Our Mission</h4>
            <p className="text-green-700">
              "Empowering fruit and vegetable entrepreneurs through market intelligence, advocacy, and capacity building
              to foster a resilient and prosperous agricultural ecosystem in Nepal."
            </p>
          </div>
        </div>
      </motion.div>
    ),
    activities: (
      <motion.div
        key="activities"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6">Our Activities</h3>
        <div className="grid gap-6">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <activity.icon className="w-8 h-8 text-green-600 mr-4" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">{activity.title}</h4>
                  <p className="text-gray-700">{activity.description}</p>
                </div>
              </div>
              <div className="mt-4 bg-green-50 p-4 rounded-md">
                <h5 className="font-semibold mb-2 text-green-800">Activity Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(activity.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <span className="block text-2xl font-bold text-green-600">{value}</span>
                      <span className="text-sm text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    ),
    statements: (
      <motion.div
        key="statements"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6">FEFVEN's Stance</h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            As a leading organization in the sector, FEFVEN's president has made several important statements regarding
            market operations and governance:
          </p>
          <div className="relative h-40 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStatement}
                className="absolute inset-0 flex items-center justify-center text-center bg-green-100 p-4 rounded-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-semibold text-green-800">"{statements[activeStatement]}"</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center space-x-2">
            {statements.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStatement(index)}
                className={`w-3 h-3 rounded-full ${activeStatement === index ? "bg-green-600" : "bg-gray-300"}`}
                aria-label={`View statement ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Our Commitment</h4>
          <p className="text-gray-700">
            These statements reflect FEFVEN's unwavering commitment to fair practices, strong governance, and
            transparent operations in Nepal's fruit and vegetable markets. We continuously strive to improve market
            conditions and support our members in navigating the complex agricultural landscape.
          </p>
        </div>
      </motion.div>
    ),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <section className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Federation of Fruits and Vegetable Entrepreneurs Nepal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering entrepreneurs, strengthening markets, and advocating for a thriving fruit and vegetable sector
              in Nepal since 2010.
            </p>
          </section>

          <section className="mb-16">
            <div className="flex justify-center space-x-4 mb-8">
              {["about", "activities", "statements"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <activity.icon className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-green-700 text-white rounded-lg p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-2">Join FEFVEN Today</h2>
                <p className="text-xl">Be part of Nepal's thriving fruit and vegetable entrepreneurship community.</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/membership"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors"
                >
                  Become a Member
                  <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-600 transition-colors"
                >
                  Contact Us
                  <ExternalLink className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

