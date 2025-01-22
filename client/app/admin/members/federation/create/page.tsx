"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EnrollmentStatus } from "../types";
import { useMemberStore } from "@/state/admin/member-store";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateMember() {
    const router = useRouter();
    const addMember = useMemberStore((state) => state.addMember);
    const [formData, setFormData] = useState({
        name: "",
        image: null as File | null,
        contactNo: "",
        designation: "",
        startDate: "",
        endDate: "",
        designationPriority: "",
        enrollmentStatus: EnrollmentStatus.PRESENT,
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === "image" && value instanceof File) {
                submitData.append(key, value);
            } else if (value !== null && value !== undefined) {
                submitData.append(key, value.toString());
            }
        }

        const response = await addMember(submitData);
        if (response.success) {
            toast({
                title: "Member Created",
                description: "Member has been successfully created",
            });
            router.push("/admin/members/federation");
        } else {
            toast({
                title: "Failed to create member",
                description: response.error,
                variant: "destructive",
            });
            setFormData({
                name: "",
                image: null,
                contactNo: "",
                designation: "",
                startDate: "",
                endDate: "",
                designationPriority: "",
                enrollmentStatus: EnrollmentStatus.PRESENT,
            });
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-center items-center">
                <div className="flex justify-between items-center w-[90%] md:w-[50%]">
                    <div className="text-center mb-4">
                        <Link
                            href="/admin/members/federation"
                            className="text-primary hover:underline text-lg font-medium"
                        >
                            <ArrowLeft size={24} className="mr-2" />
                        </Link>
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary">
                        Create New Member
                    </h1>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="image"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {previewImage && (
                        <div className="mt-2">
                            <Image
                                src={previewImage || "/placeholder.svg"}
                                alt="Preview"
                                width={100}
                                height={100}
                                className="rounded-full object-cover w-28 h-28"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="contactNo"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        id="contactNo"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="designation"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Designation
                    </label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="startDate"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="endDate"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="designationPriority"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Designation Priority
                    </label>
                    <input
                        type="number"
                        id="designationPriority"
                        name="designationPriority"
                        value={formData.designationPriority}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <span className="block text-gray-700 font-bold mb-2">
                        Enrollment Status
                    </span>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="enrollmentStatus"
                                value={EnrollmentStatus.PRESENT}
                                checked={
                                    formData.enrollmentStatus ===
                                    EnrollmentStatus.PRESENT
                                }
                                onChange={handleInputChange}
                                required
                                className="form-radio text-green-500"
                            />
                            <span className="ml-2">Present</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="enrollmentStatus"
                                value={EnrollmentStatus.PAST}
                                checked={
                                    formData.enrollmentStatus ===
                                    EnrollmentStatus.PAST
                                }
                                onChange={handleInputChange}
                                required
                                className="form-radio text-green-500"
                            />
                            <span className="ml-2">Past</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition duration-200 ease-in-out"
                    >
                        Create Member
                    </button>
                </div>
            </form>
        </div>
    );
}
