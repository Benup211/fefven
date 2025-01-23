"use client";
import OrganizationList from "@/components/user/user-organization-list"
import { useLanguage } from "@/contexts/language-context";

export default function OrganizationsPage() {
    const {language}=useLanguage();
  return (
    <div className="mx-auto min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-primary">{language==='en'?"Institutional Members":"संस्थागत सदस्यहरू"}</h1>
      <OrganizationList />
    </div>
  )
}

