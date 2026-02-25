import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {Verse} from "@/lib/types";


export default function VerseCard({ verse }: { verse:Verse }) {
    return (
        <Card className="mb-4 break-inside-avoid my-shadow group opacity-0 animate-fadeIn max-w-[320px]">
            <CardContent className="p-6 space-y-3">
                <p className="text-lg whitespace-pre-wrap p-2">
                    {verse.content}
                </p>

                {verse.reason && (
                    <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        收录原因：{verse.reason}
                    </p>
                )}

                <div className="flex justify-between items-center text-sm text-muted-foreground absolute bottom-6">
                    <div className="flex items-center gap-2 rounded-2xl">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={verse.avatar_url} />
                        </Avatar>
                        <span className="dark:text-white text-black">@{verse.github_name}</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl text-xs">
                        {new Date(verse.created_at).toLocaleString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
