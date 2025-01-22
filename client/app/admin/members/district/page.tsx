import Link from "next/link"
import { Button } from "@/components/ui/button"
import DistrictMembersList from "@/components/admin/district-member-list"

export default function DistrictMembersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">District Members</h1>
          <Link href="/admin/members/district/create">
            <Button>Create New District Member</Button>
          </Link>
        </div>
        <DistrictMembersList />
      </div>
    </div>
  )
}

