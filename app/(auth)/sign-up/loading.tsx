import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-12 w-1/2 rounded-xl mx-auto" />
                <Skeleton className="h-4 w-3/4 rounded-xl mx-auto" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4 rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-4 w-1/4 rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-4 w-1/4 rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-2 w-full rounded-xl my-4" />
                <Skeleton className="h-12 w-full rounded-xl mb-2" />
                <Skeleton className="h-4 w-full rounded-xl" />
                <Skeleton className="h-4 w-full rounded-xl" />
            </div>
        </div>
    </>
}