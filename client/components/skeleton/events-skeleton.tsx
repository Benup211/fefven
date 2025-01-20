"use client"

import { useState } from "react"
import { Search, Grid, List, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function EventListSkeleton() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const GridViewSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="flex flex-col h-full">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center mb-2">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="flex items-center mb-2">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-1/4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const TableViewSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <Skeleton className="h-4 w-40" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-24" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(6)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-40" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-48" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-12 w-3/4 mx-auto mb-8" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" className="pl-10" disabled />
          </div>
        </div>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
          <TabsList>
            <TabsTrigger value="grid">
              <Grid className="mr-2" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="table">
              <List className="mr-2" />
              Table View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
        <TabsContent value="grid">
          <GridViewSkeleton />
        </TabsContent>
        <TabsContent value="table">
          <TableViewSkeleton />
        </TabsContent>
      </Tabs>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {[...Array(5)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href="#">{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Button className="fixed bottom-4 right-4 rounded-full" size="icon">
        <ArrowUp className="h-4 w-4" />
        <span className="sr-only">Back to top</span>
      </Button>
    </div>
  )
}

