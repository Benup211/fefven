import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "./lib/types";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const isLoginRoute =url.pathname === "/admin/login";

    try {
        const cookies = req.headers.get("cookie") || "";
        const response = await axiosInstance.get("/api/user/checkAuth", {
            headers: {
                Cookie: cookies,
            },
        });
        const isAuthenticated = response.status === 200;
        if (!isAuthenticated) {
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
        if (isLoginRoute && isAuthenticated) {
            url.pathname = "/admin";
            return NextResponse.redirect(url);
        }
    } catch (error) {
        if (!isLoginRoute) {
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*"
    ],
};

