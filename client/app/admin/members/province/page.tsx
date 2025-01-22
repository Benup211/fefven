import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProvinceMembersList from "@/components/admin/province-member-list"

export default function ProvinceMembersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Province Members</h1>
          <Link href="/admin/members/province/create">
            <Button>Create New Member</Button>
          </Link>
        </div>
        <ProvinceMembersList />
      </div>
    </div>
  )
}

