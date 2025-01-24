"use client"

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image as TipTapImage } from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon, YoutubeIcon } from 'lucide-react'
import { Editor } from '@tiptap/react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from "next/navigation";
import useNewsStore from '@/state/admin/news-store'
import Image from 'next/image'

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
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-accent' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-accent' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-accent' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        type="button"
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
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the image URL')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the YouTube video URL')
          if (url) {
            editor.commands.setYoutubeVideo({ src: url })
          }
        }}
      >
        <YoutubeIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface NewsFormState {
  title: string;
  description: string;
  author: string;
  image: File | null;
  content: string;
  imagePreview: string | null;
}

export function NewsForm() {
  const [formState, setFormState] = useState<NewsFormState>({
    title: '',
    description: '',
    author: '',
    image: null,
    content: '',
    imagePreview: null
  })
  const {toast} = useToast();
  const router=useRouter();
  const {isLoading,addNews}=useNewsStore();
  const { register, handleSubmit, control, setValue, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      content: '',
    }
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        progressBarColor: 'white',
        HTMLAttributes: {
          class: 'w-full aspect-video',
        },
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setFormState(prev => ({ ...prev, content: html }))
      setValue('content', html)
      trigger('content')
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      editor.commands.setContent('')
    }
  }, [editor])

  const onSubmit = async (data: { title: string; description: string; author: string; content: string }) => {
    const response=await addNews(data.title,data.description,data.author,formState.image as File,data.content);
    if(response.success){
      toast({
        title: 'News article created successfully',
        description: 'The news article has been created successfully',
      })
      router.push('/admin/news')
    }else{
      toast({
        title: 'Error creating news article',
        description: response.error,
        variant: 'destructive',
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    setValue(name as "title" | "description" | "author", value)
    trigger(name as "title" | "description" | "author")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>News Article Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label htmlFor="title">News Title</Label>
            <Input
              id="title"
              {...register('title')}
              value={formState.title}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter the news title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">News Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              value={formState.description}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter a brief description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              {...register('author')}
              value={formState.author}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter the author's name"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          <div>
            <Label htmlFor="image">News Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
            {formState.imagePreview && (
              <div className="mt-2">
                <Image src={formState.imagePreview || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto max-h-48 object-contain" width={400} height={400} />
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
                    <EditorContent 
                      editor={editor} 
                      {...field} 
                      className="min-h-[200px] prose max-w-none focus:outline-none"
                    />
                  )}
                />
              </CardContent>
            </Card>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              dangerouslySetInnerHTML={{ __html: formState.content }} 
              className="prose max-w-none"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Create News Article'}
        </Button>
      </div>

      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        
        .ProseMirror img, .ProseMirror iframe {
          margin: 0.5em 0;
        }

        .ProseMirror p {
          margin: 0;
          line-height: 1.4;
        }

        .ProseMirror {
          padding: 0.5rem;
        }
      `}</style>
    </form>
  )
}

