"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";
import useEventStore from "@/state/admin/events-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
    title: yup.string().required("Event title is required"),
    description: yup.string().required("Event description is required"),
    category: yup.string().required("Event category is required"),
    tags: yup.string().required("Event tags are required"),
    startDate: yup.string().required("Start date is required"),
    startTime: yup.string().required("Start time is required"),
    endDate: yup.string().required("End date is required"),
    endTime: yup.string().required("End time is required"),
    venueName: yup.string().required("Venue name is required"),
    venueAddress: yup.string().required("Venue address is required"),
    city: yup.string().required("City is required"),
    organizerName: yup.string().required("Organizer name is required"),
    organizerContact: yup.string().required("Organizer contact is required"),
    organizerWebsite: yup.string().url("Must be a valid URL").optional(),
});

export function EventForm() {
    const { addEvents, isLoading } = useEventStore();
    const router = useRouter();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            tags: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            venueName: "",
            venueAddress: "",
            city: "",
            organizerName: "",
            organizerContact: "",
            organizerWebsite: "",
        },
    });

    const onSubmit = async (data: any) => {
        const response = await addEvents(
            data.title,
            data.description,
            data.category,
            data.tags,
            data.startDate,
            data.startTime,
            data.endDate,
            data.endTime,
            data.venueName,
            data.venueAddress,
            data.city,
            data.organizerName,
            data.organizerContact,
            data?.organizerWebsite
        );
        if (response.success) {
            toast({
                title: "Event Added",
                description: `Event has been added successfully`,
            });
            router.push("/admin/events");
        } else {
            toast({
                title: "Error Adding Event",
                description: response.error,
                variant: "destructive",
            });
        }
    };

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
                            <Input
                                id="title"
                                {...register("title")}
                                placeholder="Enter the event title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="category">Event Category</Label>
                            <Input
                                id="category"
                                {...register("category")}
                                placeholder="Enter event category"
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description">Event Description</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Enter the event description"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="tags">Event Tags</Label>
                        <Input
                            id="tags"
                            {...register("tags")}
                            placeholder="e.g., Agriculture, Technology, Networking"
                        />
                        {errors.tags && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tags.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Date and Time */}
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
                                <Input
                                    type="date"
                                    id="startDate"
                                    {...register("startDate")}
                                />
                            </div>
                            {errors.startDate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.startDate.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="startTime">Start Time</Label>
                            <div className="flex">
                                <Clock className="w-4 h-4 mr-2 mt-3" />
                                <Input
                                    type="time"
                                    id="startTime"
                                    {...register("startTime")}
                                />
                            </div>
                            {errors.startTime && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <div className="flex">
                                <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
                                <Input
                                    type="date"
                                    id="endDate"
                                    {...register("endDate")}
                                />
                            </div>
                            {errors.endDate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.endDate.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="endTime">End Time</Label>
                            <div className="flex">
                                <Clock className="w-4 h-4 mr-2 mt-3" />
                                <Input
                                    type="time"
                                    id="endTime"
                                    {...register("endTime")}
                                />
                            </div>
                            {errors.endTime && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.endTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Location */}
            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="venueName">Venue Name</Label>
                            <Input
                                id="venueName"
                                {...register("venueName")}
                                placeholder="Enter venue name"
                            />
                            {errors.venueName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.venueName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="city">City/Region</Label>
                            <Input
                                id="city"
                                {...register("city")}
                                placeholder="Enter city or region"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="venueAddress">Venue Address</Label>
                        <Textarea
                            id="venueAddress"
                            {...register("venueAddress")}
                            placeholder="Enter full venue address"
                        />
                        {errors.venueAddress && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.venueAddress.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Organizer Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Organizer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="organizerName">Organizer Name</Label>
                        <Input
                            id="organizerName"
                            {...register("organizerName")}
                        />
                        {errors.organizerName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.organizerName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="organizerContact">
                            Organizer Contact
                        </Label>
                        <Input
                            id="organizerContact"
                            {...register("organizerContact")}
                        />
                        {errors.organizerContact && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.organizerContact.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="organizerWebsite">
                            Website/Facebook
                        </Label>
                        <Input
                            id="organizerWebsite"
                            {...register("organizerWebsite")}
                        />
                        {errors.organizerWebsite && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.organizerWebsite.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Create Event"}
            </Button>
        </form>
    );
}
