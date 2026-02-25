"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import VerseCard from "./verse-card"
import SkeletonVerseCard from "./skeleton-verse-card"
import { Button } from "@/components/ui/button"
import {Verse} from "@/lib/types";
import { User } from "@supabase/supabase-js"
import {Minus} from "lucide-react";

export default function MineVerse() {
    const [data, setData] = useState<Verse[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User|null>(null)

    async function fetchMyCopies(currentUser: User) {
        setLoading(true)

        const { data } = await supabase
            .from("verse")
            .select("*")
            .eq("user_id", currentUser.id)
            .order("created_at", { ascending: false })

        setData(data || [])
        setLoading(false)
    }

    async function handleDelete(id: string) {
        await supabase.from("verse").delete().eq("id", id)

        setData(prev => prev.filter(item => item.id !== id))
    }
    useEffect(() => {
        async function getOwnVerse() {
            const { data } = await supabase.auth.getUser()
            const currentUser = data.user

            if (!currentUser) {
                setLoading(false)
                return
            }

            setUser(currentUser)
            await fetchMyCopies(currentUser)
        }

        getOwnVerse()
    }, [])

    useEffect(() => {
        async function getOwnVerse() {
            const { data } = await supabase.auth.getUser()
            const currentUser = data.user

            if (!currentUser) {
                setLoading(false)
                return
            }

            setUser(currentUser)
            await fetchMyCopies(currentUser)
        }
        // 防抖,false启用
        let refreshing = true


        function handleWheel(e: WheelEvent) {
            console.log(123)
            if (refreshing) return

            if (window.scrollY === 0 && e.deltaY < 0) {
                refreshing = true
                getOwnVerse().finally(() => {
                    setTimeout(() => {
                        refreshing = false
                    }, 800)
                })
            }
        }

        window.addEventListener("wheel", handleWheel)

        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [user])

    if (loading) {
        return (
            <div className="space-y-4">
                <SkeletonVerseCard />
                <SkeletonVerseCard />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="text-center text-muted-foreground py-10">
                请先登录查看你的文案
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                你还没有收录任何文案
            </div>
        )
    }

    return (
        <div className="space-y-4 flex flex-wrap gap-6">
            {data.map(item => (
                <div key={item.id} className="relative">
                    <VerseCard verse={item} />

                    <Button
                        variant="default"
                        size="sm"
                        className="absolute top-4 right-4"
                        onClick={() => handleDelete(item.id)}
                    >
                        <Minus />
                    </Button>
                </div>
            ))}
        </div>
    )
}