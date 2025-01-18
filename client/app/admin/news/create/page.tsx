import { NewsForm } from '@/components/admin/news-form'

export default function CreateNewsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New News Article</h1>
      <NewsForm />
    </div>
  )
}

