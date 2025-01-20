"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import useGalleryStore from "@/state/admin/gallery-store";
import { useToast } from "@/hooks/use-toast";

export default function AdminGalleryPage() {
    const { images, fetchImages, addImage, deleteImage, isLoading, error } =
        useGalleryStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [newImage, setNewImage] = useState<{
        title: string;
        file: File | null;
    }>({ title: "", file: null });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { toast } = useToast();

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const filteredImages = images.filter((image) =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage({ ...newImage, file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAddImage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newImage.title && newImage.file) {
            const response=await addImage(newImage.title, newImage.file);
            if(response.success){
                toast({
                    title: "Image Added",
                    description: "Image has been added successfully",
                });
                setNewImage({ title: "", file: null });
                setPreviewUrl(null);
            }else{
                toast({
                    title: "Error Adding Image",
                    description: response.error,
                    variant: "destructive",
                });
            }
        }
    };
    const handleDeleteImage = async (id: number) => {
        const response = await deleteImage(id);
        if (response.success) {
            toast({
                title: "Image Deleted",
                description: "Image has been deleted successfully",
            });
        } else {
            toast({
                title: "Error Deleting Image",
                description: response.error,
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gallery Management</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddImage} className="space-y-4">
                        <div>
                            <Label htmlFor="imageTitle">Image Title</Label>
                            <Input
                                id="imageTitle"
                                value={newImage.title}
                                onChange={(e) =>
                                    setNewImage({
                                        ...newImage,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Enter image title"
                            />
                        </div>
                        <div>
                            <Label htmlFor="imageFile">Image File</Label>
                            <Input
                                id="imageFile"
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                        </div>
                        {previewUrl && (
                            <div className="mt-4">
                                <Label>Preview</Label>
                                <div className="mt-2 relative w-full h-48">
                                    <Image
                                        src={previewUrl || "/placeholder.svg"}
                                        alt="Preview"
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            <Upload className="mr-2 h-4 w-4" /> Add Image
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search images..."
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
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredImages.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center py-4"
                                    >
                                        No Image found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredImages.map((image) => (
                                    <TableRow key={image.id}>
                                        <TableCell>
                                            <div className="relative w-40 h-40">
                                                <Image
                                                    src={`http://localhost:3001/uploads/images/${image.imageUrl}`}
                                                    alt={image.title}
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
                                                    fill
                                                    priority={false}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>{image.title}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isLoading}
                                                    onClick={() =>
                                                        handleDeleteImage(
                                                            image.id
                                                        )
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
