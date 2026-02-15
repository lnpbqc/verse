export type Verse = {
    id: string,
    content: string,
    reason: string,
    user_id: string,
    github_name: string,
    avatar_url: string,
    created_at: string,
}

export const empty_verse: Verse = {
    id:"null",
    content: "null",
    reason: "null",
    user_id: "null",
    github_name: "null",
    avatar_url: "null",
    created_at: "null",
}