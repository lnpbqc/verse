"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import VerseCard from "./verse-card"
import SkeletonVerseCard from "./skeleton-verse-card"
import { Button } from "@/components/ui/button"
import { Verse } from "@/lib/types"

export default function RandomVerse({ initialData }: { initialData: Verse }) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    async function fetchRandom() {
        setLoading(true)
        const { data } = await supabase.rpc("get_random_copy")
        setData(data?.[0])
        setLoading(false)
    }

    if (loading) return <SkeletonVerseCard />

    if (!data) {
        return (
            <div className="text-center text-muted-foreground py-10">
                暂无数据
            </div>
        )
    }

    return (
        <div className="space-y-4 flex flex-col justify-center items-center py-4">
            <VerseCard verse={data} />
            <Button onClick={fetchRandom} className="tracking-wider font-bold">换一条</Button>
        </div>
    )
}
