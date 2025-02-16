"use client"

import { useState, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAdvisoryMembersStore } from "@/state/admin/advisory-store"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface FormData {
  name: string
  contactNo: string
  designation: string
  designationPriority: string
  image: File | null
}

export default function CreateAdvisoryMemberForm() {
  const router = useRouter()
  const { addMember,isLoading } = useAdvisoryMembersStore()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactNo: "",
    designation: "",
    designationPriority: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const advisoryForm=new FormData();
    advisoryForm.append("name",formData.name);
    advisoryForm.append("contactNo",formData.contactNo);
    advisoryForm.append("designation",formData.designation);
    advisoryForm.append("designationPriority",formData.designationPriority);
    if(formData.image) {
      advisoryForm.append("image",formData.image);
    }
    const response=await addMember(advisoryForm)
    if (response.success) {
      toast({
          title: "Added successfully",
          description: "Member has been Added successfully",
      });
      router.push("/admin/members/advisory")
  } else {
      toast({
          title: "Failed to Add",
          description: response.error,
          variant: "destructive",
      });
      setFormData({
          name: "",
          contactNo: "",
          designation: "",
          designationPriority: "",
          image: null,
      })
      setImagePreview(null)
  }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required
        disabled={isLoading} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" name="image" onChange={handleImageChange} accept="image/*" required
        disabled={isLoading} />
      </div>

      {imagePreview && (
        <div className="mt-4">
          <Image
            src={imagePreview || "/placeholder.svg"}
            alt="Preview"
            width={100}
            height={100}
            className="rounded-full object-cover w-28 h-28"
          />
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="contactNo">Contact Number</Label>
        <Input
          id="contactNo"
          type="tel"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="designation">Designation</Label>
        <Input
          id="designation"
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="designationPriority">Designation Priority</Label>
        <Input
          id="designationPriority"
          type="number"
          name="designationPriority"
          value={formData.designationPriority}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading?<Loader2 className="animate-spin w-12 h-12"/>:"Create Advisory Member"}
      </Button>
    </form>
  )
}

