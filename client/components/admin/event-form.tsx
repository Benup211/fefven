"use client"

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, User, Globe, Tag, Calendar } from 'lucide-react'

const schema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  description: yup.string().required('Event description is required'),
  category: yup.string().required('Event category is required'),
  tags: yup.string().required('Event tags are required'),
  startDate: yup.date().required('Start date is required'),
  startTime: yup.string().required('Start time is required'),
  endDate: yup.date().required('End date is required'),
  endTime: yup.string().required('End time is required'),
  isRecurring: yup.boolean(),
  venueName: yup.string().required('Venue name is required'),
  venueAddress: yup.string().required('Venue address is required'),
  city: yup.string().required('City is required'),
  organizerName: yup.string().required('Organizer name is required'),
  organizerContact: yup.string().required('Organizer contact is required'),
  organizerWebsite: yup.string().url('Must be a valid URL'),
})

export function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
    ],
    content: '',
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" {...register('title')} placeholder="Enter the event title" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="category">Event Category</Label>
              <Select onValueChange={(value) => register('category').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="networking">Networking Event</SelectItem>
                  <SelectItem value="trade_show">Trade Show</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="product_launch">Product Launch</SelectItem>
                  <SelectItem value="fundraiser">Fundraiser</SelectItem>
                  <SelectItem value="award_ceremony">Award Ceremony</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="description">Event Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <EditorContent editor={editor} {...field} className="border rounded-md p-2 min-h-[200px]" />
              )}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="tags">Event Tags</Label>
            <Input id="tags" {...register('tags')} placeholder="e.g., Agriculture, Technology, Networking" />
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Date and Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <div className="flex">
                <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
                <Input type="date" id="startDate" {...register('startDate')} />
              </div>
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <div className="flex">
                <Clock className="w-4 h-4 mr-2 mt-3" />
                <Input type="time" id="startTime" {...register('startTime')} />
              </div>
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <div className="flex">
                <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
                <Input type="date" id="endDate" {...register('endDate')} />
              </div>
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <div className="flex">
                <Clock className="w-4 h-4 mr-2 mt-3" />
                <Input type="time" id="endTime" {...register('endTime')} />
              </div>
              {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isRecurring" {...register('isRecurring')} />
            <Label htmlFor="isRecurring">Recurring Event</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="venueName">Venue Name</Label>
              <Input id="venueName" {...register('venueName')} placeholder="Enter venue name" />
              {errors.venueName && <p className="text-red-500 text-sm mt-1">{errors.venueName.message}</p>}
            </div>
            <div>
              <Label htmlFor="city">City/Region</Label>
              <Input id="city" {...register('city')} placeholder="Enter city or region" />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="venueAddress">Venue Address</Label>
            <Textarea id="venueAddress" {...register('venueAddress')} placeholder="Enter full venue address" />
            {errors.venueAddress && <p className="text-red-500 text-sm mt-1">{errors.venueAddress.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organizer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="organizerName">Organizer Name</Label>
            <Input id="organizerName" {...register('organizerName')} />
            {errors.organizerName && <p className="text-red-500 text-sm mt-1">{errors.organizerName.message}</p>}
          </div>
          <div>
            <Label htmlFor="organizerContact">Organizer Contact</Label>
            <Input id="organizerContact" {...register('organizerContact')} />
            {errors.organizerContact && <p className="text-red-500 text-sm mt-1">{errors.organizerContact.message}</p>}
          </div>
          <div>
            <Label htmlFor="organizerWebsite">Website/Facebook</Label>
            <Input id="organizerWebsite" {...register('organizerWebsite')} />
            {errors.organizerWebsite && <p className="text-red-500 text-sm mt-1">{errors.organizerWebsite.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Event'}
      </Button>
    </form>
  )
}

