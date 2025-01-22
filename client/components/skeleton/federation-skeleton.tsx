import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function FederationMembersSkeleton() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Federation Members</h1>
        <Button asChild>
          <Link href="/admin/members/federation/create" className="bg-green-500 hover:bg-green-600">
            <PlusCircle size={20} className="mr-2" />
            Create Member
          </Link>
        </Button>
      </div>
      <SearchFilterSkeleton />
      <MemberTableSkeleton />
      <PaginationSkeleton />
    </div>
  )
}

function SearchFilterSkeleton() {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Skeleton className="w-full sm:w-64 h-10 rounded-md" />
      <Skeleton className="w-full sm:w-32 h-10 rounded-md" />
      <Skeleton className="w-full sm:w-24 h-10 rounded-md" />
    </div>
  )
}

function MemberTableSkeleton() {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {["Image", "Name", "Contact No", "Designation", "Enrollment Status", "Actions"].map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-4 px-4 whitespace-nowrap">
                <Skeleton className="w-12 h-12 rounded-full" />
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <Skeleton className="w-24 h-4" />
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <Skeleton className="w-24 h-4" />
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <Skeleton className="w-24 h-4" />
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <Skeleton className="w-20 h-6 rounded-full" />
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <Skeleton className="w-6 h-6" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PaginationSkeleton() {
  return (
    <div className="mt-4 flex justify-center">
      <Skeleton className="w-8 h-8 rounded-md mx-1" />
      <Skeleton className="w-8 h-8 rounded-md mx-1" />
      <Skeleton className="w-8 h-8 rounded-md mx-1" />
    </div>
  )
}

