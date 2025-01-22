import CreateProvinceMember from "@/components/admin/province-create-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CreateMemberPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin/members/province/">
            <Button variant="outline">← Back to Members List</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Create New Member</h1>
          <CreateProvinceMember />
        </div>
      </div>
    </div>
  )
}

