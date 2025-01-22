import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserProvinceCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-[225px] w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-1" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}

export function UserProvinceListItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center">
        <Skeleton className="h-16 w-16 rounded-full mr-4" />
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-1" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

