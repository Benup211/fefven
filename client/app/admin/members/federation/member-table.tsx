"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import type { FederationMember } from "./types"
import { useMemberStore } from "@/state/admin/member-store"
import {toast} from "@/hooks/use-toast"

export default function MemberTable({ members }: { members: FederationMember[] }) {
  const {deleteMember,error,loading} = useMemberStore()

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const response=await deleteMember(id)
      if(response.success){
        toast({
          title: "Deleted successfully",
          description: "Member has been deleted successfully",
        })
      }else{
        toast({
          title: "Failed to delete",
          description: response.error,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact No
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Enrollment Status
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {error?(
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center text-red-600 font-medium">
                {error}
              </td>
            </tr>
          ):(
            members.length===0?(
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-600 font-medium">
                  No members found
                </td>
              </tr>
            ):(
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${member.imageUrl}` || "/placeholder.svg"}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-12 h-12"
                    />
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.name}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.contactNo}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.designation}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.enrollmentStatus === "PRESENT" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.enrollmentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(member.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-900 focus:outline-none"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

