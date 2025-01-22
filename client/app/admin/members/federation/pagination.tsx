"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
}: {
  currentPage: number
  totalItems: number
  itemsPerPage: number
}) {
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    return `/federation-members?${params.toString()}`
  }

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-gray-300 hover:bg-blue-100"
          } transition duration-200 ease-in-out`}
        >
          {page}
        </Link>
      ))}
    </div>
  )
}

