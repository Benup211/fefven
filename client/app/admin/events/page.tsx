"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import useEventStore from "@/state/admin/events-store";
import { useToast } from "@/hooks/use-toast";
export default function AdminEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { events, isLoading, deleteEvents, fetchEvents, error } =
        useEventStore();
    const {toast} = useToast();
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        const response = await deleteEvents(id);
        if (response.success) {
            toast({
                title: "Event deleted successfully",
                description: "Event has been deleted successfully",
            })
        }else{
            toast({
                title: "Error deleting event",
                description: response.error,
                variant: "destructive",
            })
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Events Management</h1>
                <Link href="/admin/events/create" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Location
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEvents.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-4"
                                    >
                                        No Events found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredEvents.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">
                                            {event.title}
                                        </TableCell>
                                        <TableCell>
                                            {event.startDate}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {event.venueAddress} {event.city}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(event.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Delete
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
