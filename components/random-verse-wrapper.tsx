// RandomVerseWrapper.tsx  (默认就是 server component)

import { createServerSupabase } from "@/lib/supabase-server"
import RandomVerse from "./random-verse"

export default async function RandomVerseWrapper() {
    const supabase = await createServerSupabase()

    const { data } = await supabase.rpc("get_random_copy")

    return <RandomVerse initialData={data?.[0]} />
}
