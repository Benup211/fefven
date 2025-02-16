import Link from "next/link"
import { Button } from "@/components/ui/button"
import AdvisoryMembersList from "@/components/admin/advisory-member-list"

export default function AdvisoryMembersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Advisory Members</h1>
          <Link href="/admin/members/advisory/create">
            <Button>Create New Advisory Member</Button>
          </Link>
        </div>
        <AdvisoryMembersList />
      </div>
    </div>
  )
}

