"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase-client"
import VerseCard from "./verse-card"
import { Verse } from "@/lib/types"

const PAGE_SIZE = 8

export default function AllVerse({
                                     initialData,
}: {
    initialData: Verse[]
}) {
    const [data, setData] = useState(initialData)
    const [page, setPage] = useState(1) // 已加载第一页
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const loaderRef = useRef<HTMLDivElement | null>(null)

    const fetchMore = useCallback(async () => {
        if (loading || !hasMore) return

        setLoading(true)

        const from = page * PAGE_SIZE
        const to = from + PAGE_SIZE - 1

        const { data: newData } = await supabase
            .from("verse")
            .select("*")
            .order("created_at", { ascending: false })
            .range(from, to)

        if (!newData || newData.length < PAGE_SIZE) {
            setHasMore(false)
        }

        if (newData?.length) {
            setData(prev => [...prev, ...newData])
            setPage(p => p + 1)
        }

        setLoading(false)
    }, [page, loading, hasMore])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchMore()
                }
            },
            { threshold: 1 }
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()
    }, [fetchMore])

    // columns-2
    // sm:columns-2
    // lg:columns-3
    // gap-y-20
    // gap-x-20
    return (
        <div className="
            w-full
            flex
            flex-wrap
            justify-center
            space-evenly
            gap-2
            p-2
            ">
            {data.map(item => (
                <VerseCard key={item.id} verse={item} />
            ))}

            {hasMore && <div ref={loaderRef} className="h-10" />}
        </div>
    )
}
