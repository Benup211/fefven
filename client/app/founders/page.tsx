"use client";
import FoundingOrganizationList from "@/components/user/user-founder-list";
import { useLanguage } from "@/contexts/language-context";

export default function FoundingOrganizationsPage() {
    const {language}=useLanguage();
  return (
    <div className="mx-auto min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-primary">{language==='en'?"Founding Members":"संस्थापक सदस्यहरू"}</h1>
      <FoundingOrganizationList />
    </div>
  )
}

