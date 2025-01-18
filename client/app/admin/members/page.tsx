"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Edit, Trash2, Save, X } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Member {
  id: number
  name: string
  image: string
  fbLink: string
  contactNumber: string
  designation: string
  yearEnrolled: string
}

// Mock data for initial members
const initialMembers: Member[] = [
  { id: 1, name: "John Doe", image: "/placeholder.svg?height=100&width=100", fbLink: "https://facebook.com/johndoe", contactNumber: "+977 9841234567", designation: "President", yearEnrolled: "2020" },
  { id: 2, name: "Jane Smith", image: "/placeholder.svg?height=100&width=100", fbLink: "https://facebook.com/janesmith", contactNumber: "+977 9847654321", designation: "Secretary", yearEnrolled: "2021" },
]

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [newMember, setNewMember] = useState<Omit<Member, 'id'>>({
    name: '',
    image: '',
    fbLink: '',
    contactNumber: '',
    designation: '',
    yearEnrolled: '',
  })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.max(...members.map(m => m.id), 0) + 1
    setMembers([...members, { id, ...newMember }])
    setNewMember({
      name: '',
      image: '',
      fbLink: '',
      contactNumber: '',
      designation: '',
      yearEnrolled: '',
    })
    toast({
      title: "Member Added",
      description: `${newMember.name} has been added successfully.`,
    })
  }

  const handleDeleteMember = (id: number) => {
    const memberToDelete = members.find(m => m.id === id)
    setMembers(members.filter(member => member.id !== id))
    toast({
      title: "Member Deleted",
      description: `${memberToDelete?.name} has been removed from the list.`,
      variant: "destructive",
    })
  }

  const handleUpdateMember = () => {
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? editingMember : m))
      setEditingMember(null)
      setIsEditDialogOpen(false)
      toast({
        title: "Member Updated",
        description: `${editingMember.name}'s information has been updated.`,
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFunction: React.Dispatch<React.SetStateAction<any>>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFunction((prev: any) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Members Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter member name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setNewMember)}
                />
              </div>
              <div>
                <Label htmlFor="fbLink">Facebook Link</Label>
                <Input
                  id="fbLink"
                  value={newMember.fbLink}
                  onChange={(e) => setNewMember({ ...newMember, fbLink: e.target.value })}
                  placeholder="Enter Facebook profile link"
                />
              </div>
              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={newMember.contactNumber}
                  onChange={(e) => setNewMember({ ...newMember, contactNumber: e.target.value })}
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={newMember.designation}
                  onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                  placeholder="Enter designation"
                  required
                />
              </div>
              <div>
                <Label htmlFor="yearEnrolled">Year Enrolled</Label>
                <Select
                  value={newMember.yearEnrolled}
                  onValueChange={(value) => setNewMember({ ...newMember, yearEnrolled: value })}
                >
                  <SelectTrigger id="yearEnrolled">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Year Enrolled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.designation}</TableCell>
                <TableCell>{member.contactNumber}</TableCell>
                <TableCell>{member.yearEnrolled}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setEditingMember(member)
                      setIsEditDialogOpen(true)
                    }}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateMember(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-image">Image</Label>
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEditingMember)}
                  />
                  {editingMember.image && (
                    <div className="mt-2">
                      <Image
                        src={editingMember.image || "/placeholder.svg"}
                        alt={editingMember.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="edit-fbLink">Facebook Link</Label>
                  <Input
                    id="edit-fbLink"
                    value={editingMember.fbLink}
                    onChange={(e) => setEditingMember({ ...editingMember, fbLink: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contactNumber">Contact Number</Label>
                  <Input
                    id="edit-contactNumber"
                    value={editingMember.contactNumber}
                    onChange={(e) => setEditingMember({ ...editingMember, contactNumber: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-designation">Designation</Label>
                  <Input
                    id="edit-designation"
                    value={editingMember.designation}
                    onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-yearEnrolled">Year Enrolled</Label>
                  <Select
                    value={editingMember.yearEnrolled}
                    onValueChange={(value) => setEditingMember({ ...editingMember, yearEnrolled: value })}
                  >
                    <SelectTrigger id="edit-yearEnrolled">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() - i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Member</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

