"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, Trash2, View } from 'lucide-react'
import useResourceStore from '@/state/admin/resource-store'
import { useToast } from '@/hooks/use-toast'

export default function AdminResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { resources, isLoading, error, fetchResources, deleteResource } = useResourceStore()
  const {toast} = useToast()

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  if (isLoading) {
    return <div>Loading...</div>
  }
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const data=await deleteResource(id)
      if(data.success){
        toast({
          title: "Resource Deleted",
          description: `Resource has been deleted successfully`,
        })
      }else{
        toast({
          title: "Error Deleting Resource",
          description: data.error,
          variant:'destructive'
        })

      }
    }
  }
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Resources Management</h1>
        <Link href="/admin/resources/add" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Resource
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.length === 0 ? (
                <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No Resource found
                </TableCell>
              </TableRow>
              ):(
                filteredResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{resource.description}</TableCell>
                    <TableCell>
                      <Link href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/files/${resource.fileUrl}`} target='_blank'>
                        <Button variant="ghost" size="sm" className="mr-2">
                          <View className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(resource.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

