import { createServerSupabase } from "@/lib/supabase-server"
import AllVerse from "./all-verse"

const PAGE_SIZE = 8

export default async function AllVerseWrapper() {
    const supabase = await createServerSupabase()

    const { data } = await supabase
        .from("verse")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, PAGE_SIZE - 1)

    return <AllVerse initialData={data ?? []} />
}
