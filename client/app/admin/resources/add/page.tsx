import { ResourceForm } from '@/components/admin/resource-form'

export default function AddResourcePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Resource</h1>
      <ResourceForm />
    </div>
  )
}

