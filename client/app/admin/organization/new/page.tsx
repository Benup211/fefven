"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrganizationStore } from "@/state/admin/organization-store";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

export default function CreateOrganization() {
    const [name, setName] = useState("");
    const [establishedAt, setEstablishedAt] = useState("");
    const router = useRouter();
    const { createOrganization, Loading } = useOrganizationStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !establishedAt) {
            toast({
                title: "Invalid Input",
                description: "Please fill in all the fields",
                variant: "destructive",
            });
            return;
        }
        const response = await createOrganization(name, establishedAt);
        if (response.success) {
            toast({
                title: "Organization Created",
                description: "Organization has been successfully created",
            });
            router.push("/admin/organization");
        } else {
            toast({
                title: "Organization Creation Failed",
                description: response.error,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/admin/organization" passHref>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Create New Organization
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Organization Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="establishedAt"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Established Date (BS)
                        </label>
                        <Input
                            id="establishedAt"
                            type="number"
                            value={establishedAt}
                            onChange={(e) => setEstablishedAt(e.target.value)}
                            required
                            className="mt-1 w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={Loading}>
                        {Loading ? <Loader2 className="animate-spin w-12 h-12"/> : "Create Organization"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
