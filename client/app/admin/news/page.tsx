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
import useNewsStore from "@/state/admin/news-store";
import { toast } from "@/hooks/use-toast";

export default function AdminNewsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { news, isLoading, error, deleteNews, fetchNews } = useNewsStore();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const filteredNews = news.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        const response = await deleteNews(id);
        if (response.success) {
            toast({
                title: "News article deleted successfully",
                description: "The news article has been deleted successfully",
            });
        } else {
            toast({
                title: "Error deleting news",
                description: response.error,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">News Management</h1>
                <Link href="/admin/news/create" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create News
                        Article
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Author
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center text-red-500"
                                >
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : filteredNews.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No news articles found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredNews.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            article.createdAt
                                        ).toDateString()}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {article.author}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    handleDelete(article.id)
                                                }
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
