"use client"
import { supabase } from "@/lib/supabase-client"
import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User } from "@supabase/supabase-js";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import { toast } from "sonner"


export function Header() {
    const [user, setUser] = useState<User|null>(null)
    const [open, setOpen] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])

    // github 的 Callback https://mbshoabifwzahftqvknz.supabase.co/auth/v1/callback
    // github 的 OAuth id Ov23liB8NNSI8QuNZcgq
    // github 的 OAuth secret 9409aa33f07dfd70cbcdde393e0fc68af830f97c
    async function loginWithGithub() {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
        })
    }

    async function logout() {
        await supabase.auth.signOut()
        location.reload()
    }

    async function loginWithEmail(){
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)

        if (!error) {
            setOpen(false)
            location.reload()
        } else {
            toast.error(error.message)
        }
    }

    async function registerWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })
        setLoading(false)

        if (!error) {
            toast("注册成功，请检查邮箱确认")
            setOpen(false)
        } else {
            if (error.message.includes("already registered")) {
                toast.error("该邮箱已注册，请检查其他登录方式")
            } else {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <h1 className="font-bold text-xl">文案社区</h1>

            {user ? (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={user.user_metadata.avatar_url} />
                    </Avatar>
                    <Button onClick={logout}>退出</Button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Button onClick={loginWithGithub}>GitHub 登录</Button>
                    {/* 邮箱登录注册弹窗 */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">邮箱登录 / 注册</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>邮箱账号</DialogTitle>
                            </DialogHeader>

                            <Tabs defaultValue="login" className="mt-4">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="login">登录</TabsTrigger>
                                    <TabsTrigger value="register">注册</TabsTrigger>
                                </TabsList>

                                {/* 登录 */}
                                <TabsContent value="login" className="space-y-4 mt-4">
                                    <Input
                                        placeholder="邮箱"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        placeholder="密码"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                        className="w-full"
                                        onClick={loginWithEmail}
                                        disabled={loading}
                                    >
                                        {loading ? "登录中..." : "登录"}
                                    </Button>
                                </TabsContent>

                                {/* 注册 */}
                                <TabsContent value="register" className="space-y-4 mt-4">
                                    <Input
                                        placeholder="邮箱"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        placeholder="密码（至少6位）"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                        className="w-full"
                                        onClick={registerWithEmail}
                                        disabled={loading}
                                    >
                                        {loading ? "注册中..." : "注册"}
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </div>

            )}
        </div>
    )
}
