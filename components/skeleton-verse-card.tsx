import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonVerseCard() {
    return (
        <div className="space-y-3 flex flex-col justify-center items-center">
            <Skeleton className="h-44 w-60 rounded-xl" />
            <Skeleton className="h-6 w-18" />
        </div>
    )
}
