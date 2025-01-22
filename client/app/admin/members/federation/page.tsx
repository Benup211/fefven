"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { useMemberStore } from "@/state/admin/member-store"
import { EnrollmentStatus, type FederationMember } from "./types"
import MemberTable from "./member-table"
import SearchFilter from "./search-filter"
import Pagination from "./pagination"
import { useSearchParams } from 'next/navigation';
import FederationMembersSkeleton from "@/components/skeleton/federation-skeleton"
export default function FederationMemberList() {
  const searchParams = useSearchParams();
  const { members, loading, error, fetchMembers } = useMemberStore()
  const status = (searchParams.get('status') as EnrollmentStatus) || EnrollmentStatus.ALL;
  const search = searchParams.get('search') || "";
  const isFetched = useRef(false);
  const page = Number.parseInt(searchParams.get('page') || "1", 10)
  const itemsPerPage = 10

  const [loadingData, setLoadingData] = useState(true);
  
      useEffect(() => {
          const fetchData = async () => {
              if (isFetched.current) return;
              isFetched.current = true;
              try {
                  setLoadingData(true);
                  await fetchMembers();
              } catch (err) {
                  console.error(err);
              } finally {
                  setLoadingData(false);
              }
          };
  
          fetchData();
      }, [fetchMembers]);

  const filterMembers = (members: FederationMember[]) => {
    return members.filter(
      (member) =>
        (member.name.toLowerCase().includes(search.toLowerCase()) || member.contactNo.includes(search)) &&
        (status === EnrollmentStatus.ALL || member.enrollmentStatus === status),
    )
  }

  const filteredMembers = Array.isArray(members) ? filterMembers(members) : []
  const paginatedMembers = filteredMembers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  if (loadingData) return <FederationMembersSkeleton/>

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Federation Members</h1>
        <Link
          href="/admin/members/federation/create"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out flex items-center"
        >
          <PlusCircle size={20} className="mr-2" />
          Create Member
        </Link>
      </div>
      <SearchFilter />
      <MemberTable members={paginatedMembers} />
      {filteredMembers.length > itemsPerPage && (
        <Pagination currentPage={page} totalItems={filteredMembers.length} itemsPerPage={itemsPerPage} />
      )}
    </div>
  )
}

