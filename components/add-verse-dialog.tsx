"use client"

import { useState, useTransition } from "react"
import { createVerse } from "@/app/action"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function AddVerseDialog() {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    function handleSubmit(formData: FormData) {
        setError(null)

        startTransition(() => {
            createVerse(formData)
                .then(() => {
                    setOpen(false)
                })
                .catch((err) => {
                    setError(
                        err instanceof Error ? err.message : "提交失败"
                    )
                })
        })

        location.reload()
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg"
                >
                    <Plus />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>新增文案</DialogTitle>
                </DialogHeader>

                <form action={handleSubmit} className="space-y-4">

                    <Textarea
                        name="content"
                        placeholder="输入文案内容..."
                        required
                        className="min-h-[120px]"
                    />

                    <Input
                        name="reason"
                        placeholder="收录原因（可选）"
                    />

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "保存中..." : "保存"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}
