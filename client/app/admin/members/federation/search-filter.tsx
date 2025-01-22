"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { EnrollmentStatus } from "./types"

export default function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [status, setStatus] = useState<EnrollmentStatus>(
    (searchParams.get("status") as EnrollmentStatus) || EnrollmentStatus.ALL,
  )

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status !== EnrollmentStatus.ALL) params.set("status", status)
    router.push(`/admin/members/federation?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search members..."
        className="w-full sm:w-64 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as EnrollmentStatus)}
        className="w-full sm:w-auto border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value={EnrollmentStatus.ALL}>All</option>
        <option value={EnrollmentStatus.PRESENT}>Present</option>
        <option value={EnrollmentStatus.PAST}>Past</option>
      </select>
      <button
        onClick={handleSearch}
        className="w-full sm:w-auto bg-primary text-white p-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
      >
        Search
      </button>
    </div>
  )
}

