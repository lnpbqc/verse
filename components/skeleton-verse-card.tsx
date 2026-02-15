import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonVerseCard() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-6 w-1/3" />
        </div>
    )
}
