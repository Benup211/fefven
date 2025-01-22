import { Skeleton } from "@/components/ui/skeleton"

export function ProvinceSkeletonRow() {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b text-center">
        <div className="flex justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </td>
      <td className="py-2 px-4 border-b text-center">
        <Skeleton className="h-4 w-24 mx-auto" />
      </td>
      <td className="py-2 px-4 border-b text-center">
        <Skeleton className="h-4 w-24 mx-auto" />
      </td>
      <td className="py-2 px-4 border-b text-center">
        <Skeleton className="h-4 w-24 mx-auto" />
      </td>
      <td className="py-2 px-4 border-b text-center">
        <Skeleton className="h-4 w-16 mx-auto" />
      </td>
      <td className="py-2 px-4 border-b text-center">
        <Skeleton className="h-8 w-8 rounded-full mx-auto" />
      </td>
    </tr>
  )
}

