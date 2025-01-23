"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useOrganizationMemberStore } from "@/state/admin/organization-member-store"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import {toast} from "@/hooks/use-toast"

export default function CreateMember() {
  const { id } = useParams()
  const router = useRouter()
  const [name, setName] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [designation, setDesignation] = useState("")
  const [designationPriority, setDesignationPriority] = useState("")
  const { createMember,Loading } = useOrganizationMemberStore()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if(!name || !contactNo || !designation || !designationPriority) return
    const response=await createMember({
      name,
      contactNo,
      designation,
      designationPriority: Number(designationPriority),
      organizationId: Number(id),
    })
    if(response.success){
      toast({
        title:"Member Created",
        description:"Member has been created successfully",
      })
      router.push(`/admin/organization/${id}`)
    }else{
      toast({
        title:"Error Creating Member",
        description:response.error,
        variant:"destructive",
      })
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <Link href={`/admin/organization/${id}`} passHref>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary/90 dark:text-gray-100">Add New Member</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Number
            </label>
            <Input
              id="contactNo"
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Designation
            </label>
            <Input
              id="designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="designationPriority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Designation Priority
            </label>
            <Input
              id="designationPriority"
              type="number"
              value={designationPriority}
              onChange={(e) => setDesignationPriority(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={Loading}>
            {Loading?<Loader2 className="animate-spin"/>:"Add Member"}
          </Button>
        </form>
      </div>
    </div>
  )
}

