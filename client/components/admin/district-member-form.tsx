"use client"

import { useState, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useDistrictMembersStore } from "@/state/admin/district-store"
import { nepaliDistricts } from "@/lib/nepaliDistricts"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface FormData {
  name: string
  contactNo: string
  designation: string
  designationPriority: string
  district: string
  image: File | null
}

export default function CreateDistrictMemberForm() {
  const router = useRouter()
  const { addMember,isLoading } = useDistrictMembersStore()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactNo: "",
    designation: "",
    designationPriority: "",
    district: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
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
    const districtForm=new FormData();
    districtForm.append("name",formData.name);
    districtForm.append("contactNo",formData.contactNo);
    districtForm.append("designation",formData.designation);
    districtForm.append("designationPriority",formData.designationPriority);
    districtForm.append("district",formData.district);
    if(formData.image) {
      districtForm.append("image",formData.image);
    }
    const response=await addMember(districtForm)
    if (response.success) {
      toast({
          title: "Added successfully",
          description: "Member has been Added successfully",
      });
      router.push("/admin/members/district")
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
          district: "",
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

      <div className="grid gap-2">
        <Label htmlFor="district">District</Label>
        <Select value={formData.district} onValueChange={(value) => handleSelectChange("district", value)} required
          disabled={isLoading}>
          <SelectTrigger id="district">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {nepaliDistricts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading?<Loader2 className="animate-spin w-12 h-12"/>:"Create District Member"}
      </Button>
    </form>
  )
}

