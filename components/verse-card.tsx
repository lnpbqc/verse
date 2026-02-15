import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {Verse} from "@/lib/types";


export default function VerseCard({ verse }: { verse:Verse }) {
    return (
        <Card className="mb-4">
            <CardContent className="p-6 space-y-3">
                <p className="text-lg whitespace-pre-wrap">
                    {verse.content}
                </p>

                {verse.reason && (
                    <p className="text-sm text-muted-foreground">
                        收录原因：{verse.reason}
                    </p>
                )}

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={verse.avatar_url} />
                        </Avatar>
                        <span>@{verse.github_name}</span>
                    </div>
                    <div>
                        {new Date(verse.created_at).toUTCString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
