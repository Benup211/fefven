"use client"

import { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon } from 'lucide-react'
import { Editor } from '@tiptap/react'

const schema = yup.object().shape({
  title: yup.string().required('News title is required'),
  description: yup.string().required('News description is required'),
  author: yup.string().required('Author name is required'),
  content: yup.string().required('News content is required'),
})


const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-accent' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-accent' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-accent' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          const url = window.prompt('Enter the URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          } else {
            editor.chain().focus().unsetLink().run()
          }
        }}
        className={editor.isActive('link') ? 'bg-accent' : ''}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          const url = window.prompt('Enter the image URL')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function NewsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor) {
      editor.commands.setContent('')
    }
  }, [editor])

  const onSubmit = async (data:any) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>News Article Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">News Title</Label>
            <Input id="title" {...register('title')} placeholder="Enter the news title" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">News Description</Label>
            <Textarea id="description" {...register('description')} placeholder="Enter a brief description" />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...register('author')} placeholder="Enter the author's name" />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          <div>
            <Label htmlFor="image">News Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto max-h-48 object-contain" />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="content">News Content</Label>
            <Card>
              <MenuBar editor={editor} />
              <CardContent>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <EditorContent editor={editor} {...field} className="min-h-[200px] prose max-w-none" />
                  )}
                />
              </CardContent>
            </Card>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create News Article'}
        </Button>
      </div>
    </form>
  )
}

