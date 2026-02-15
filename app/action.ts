"use server"

import { createServerSupabase } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function createVerse(formData: FormData) {
    const content = formData.get("content") as string
    const reason = formData.get("reason") as string

    const supabase = await createServerSupabase()


    const {data:{user}} = await supabase.auth.getUser()

    console.log(user)

    if (!user) throw new Error("未登录")

    const { error } = await supabase.from("verse").insert({
        content,
        reason,
        user_id: user.id,
        github_name: user.user_metadata.user_name,
        avatar_url: user.user_metadata.avatar_url,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/")
}
