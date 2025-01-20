"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trash2, Upload } from "lucide-react";
import useCarouselStore from "@/state/admin/carousel-store";
import { useState } from "react";
import { NewCarouselItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminCarouselPage() {
    const {
        items,
        searchTerm,
        isLoading,
        error,
        fetchItems,
        addItem,
        deleteItem,
        setSearchTerm,
    } = useCarouselStore();

    const [newItem, setNewItem] = useState<NewCarouselItem>({
        title: "",
        description: "",
        file: null,
    });
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const {toast} = useToast();

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewItem({ ...newItem, file });

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newItem.title && newItem.description && newItem.file) {
            const response = await addItem(newItem);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Carousel item added successfully",
                })
                setNewItem({ title: "", description: "", file: null });
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl("");
                }
            }else{
                toast({
                    title: "Error adding item",
                    description: response.error,
                    variant: "destructive",
                })
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const response=await deleteItem(id);
            if(response.success){
                toast({
                    title: "Success",
                    description: "Carousel item deleted successfully",
                })
            }else{
                toast({
                    title: "Error deleting item",
                    description: response.error,
                    variant: "destructive",
                })
            }
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Carousel Management</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Carousel Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddItem} className="space-y-4">
                        <div>
                            <Label htmlFor="itemTitle">Title</Label>
                            <Input
                                id="itemTitle"
                                value={newItem.title}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Enter title"
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="itemDescription">Description</Label>
                            <Textarea
                                id="itemDescription"
                                value={newItem.description}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Enter description"
                                className="mb-2"
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="itemImage">Image</Label>
                                <Input
                                    id="itemImage"
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="mb-2"
                                />
                            </div>
                            {previewUrl && (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            <Upload className="mr-2 h-4 w-4" /> Add Carousel
                            Item
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search carousel items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead className="w-[200px]">Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-4"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-4 text-red-500"
                                >
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : filteredItems.length ? (
                            filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${item.imageUrl}`}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            disabled={isLoading}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-4"
                                >
                                    No items found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
