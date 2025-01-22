"use client"
import { FederationMembersClient } from "@/components/user/user-federation-member"
import { useLanguage } from "@/contexts/language-context"

export default function FederationMembersPage() {
    const {language}=useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-primary">{language==='en'?"Federation Executive Committee":"महासंघ कार्य समिति"}</h1>
        <FederationMembersClient />
      </div>
    </div>
  )
}

