import { EventForm } from '@/components/admin/event-form'

export default function CreateEventPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <EventForm />
    </div>
  )
}

