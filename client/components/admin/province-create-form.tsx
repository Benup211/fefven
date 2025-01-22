"use client"

import { useState, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useProvinceStore } from "@/state/admin/province-store"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface FormDataProps {
  name: string
  contactNo: string
  designation: string
  designationPriority: string
  province: string
  image: File | null
}

export default function CreateProvinceMember() {
  const router = useRouter()
  const { addMember,isLoading } = useProvinceStore()
  const [formProvinceData, setFormProvinceData] = useState<FormDataProps>({
    name: "",
    contactNo: "",
    designation: "",
    designationPriority: "",
    province: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormProvinceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormProvinceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        setFormProvinceData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData()
    formDataToSubmit.append("name", formProvinceData.name)
    formDataToSubmit.append("contactNo", formProvinceData.contactNo)
    formDataToSubmit.append("designation", formProvinceData.designation)
    formDataToSubmit.append("designationPriority", formProvinceData.designationPriority)
    formDataToSubmit.append("province", formProvinceData.province)
    if (formProvinceData.image) {
      formDataToSubmit.append("image", formProvinceData.image)
    }

    const response=await addMember(formDataToSubmit)
    if (response.success) {
        toast({
            title: "Deleted successfully",
            description: "Member has been deleted successfully",
        });
        router.push("/admin/members/province")
    } else {
        toast({
            title: "Failed to delete",
            description: response.error,
            variant: "destructive",
        });
        setFormProvinceData({
            name: "",
            contactNo: "",
            designation: "",
            designationPriority: "",
            province: "",
            image: null,
        })
        setImagePreview(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" value={formProvinceData.name} onChange={handleInputChange} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" name="image" onChange={handleImageChange} accept="image/*" required />
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
          value={formProvinceData.contactNo}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="designation">Designation</Label>
        <Input
          id="designation"
          type="text"
          name="designation"
          value={formProvinceData.designation}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="designationPriority">Designation Priority</Label>
        <Input
          id="designationPriority"
          type="number"
          name="designationPriority"
          value={formProvinceData.designationPriority}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="province">Province</Label>
        <Select value={formProvinceData.province} onValueChange={(value) => handleSelectChange("province", value)} required>
          <SelectTrigger id="province">
            <SelectValue placeholder="Select Province" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7].map((province) => (
              <SelectItem key={province} value={province.toString()}>
                Province {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading?<Loader2 className="animate-spin w-12 h-12"/>:"Create Member"}
      </Button>
    </form>
  )
}

