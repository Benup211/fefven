"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon, UploadIcon } from 'lucide-react'

const schema = yup.object().shape({
  title: yup.string().required('Resource title is required'),
  description: yup.string().required('Resource description is required'),
  file: yup.mixed().required('File is required'),
})

export function ResourceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data:any) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFilePreview(file.name)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Resource</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Resource Title</Label>
            <Input id="title" {...register('title')} placeholder="Enter the resource title" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Resource Description</Label>
            <Textarea id="description" {...register('description')} placeholder="Enter a brief description" />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="file">Upload File</Label>
            <div className="mt-2">
              <Input
                id="file"
                type="file"
                {...register('file')}
                onChange={handleFileUpload}
                className="hidden"
              />
              <Label
                htmlFor="file"
                className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
              >
                {filePreview ? (
                  <div className="flex items-center">
                    <FileIcon className="w-8 h-8 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">{filePreview}</span>
                  </div>
                ) : (
                  <span className="flex items-center space-x-2">
                    <UploadIcon className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                )}
              </Label>
            </div>
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Resource'}
        </Button>
      </div>
    </form>
  )
}

