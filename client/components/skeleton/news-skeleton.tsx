"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, List, Search } from "lucide-react"

export default function NewsSkeletonLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-12 w-3/4 mx-auto mb-8" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" className="pl-10" disabled />
          </div>
        </div>
        <Tabs defaultValue="grid">
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

      <Tabs defaultValue="grid">
        <TabsContent value="grid">
          <GridViewSkeleton />
        </TabsContent>
        <TabsContent value="table">
          <TableViewSkeleton />
        </TabsContent>
      </Tabs>

      <div className="flex justify-center items-center space-x-2 mt-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <Skeleton key={num} className="h-10 w-10" />
        ))}
      </div>
    </div>
  )
}

function GridViewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="flex flex-col">
          <Skeleton className="w-full h-48" />
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="flex-grow">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function TableViewSkeleton() {
  return (
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
            <Skeleton className="h-4 w-48" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-24" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-48" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

