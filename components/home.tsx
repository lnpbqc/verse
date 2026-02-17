"use client"

import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";

export default function HomeTab() {
    return (
        <TabsContent value="home">
            <div className="flex flex-col gap-6 min-h-full items-center justify-center px-6">
                <div className="text-center space-y-6 my-shadow p-18 rounded-2xl">

                    {/* 中文主文案 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-3 text-lg md:text-xl leading-relaxed"
                    >
                        <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            我学着太多不去担心得太远
                        </motion.p>
                        <motion.p initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            不计划太多反而能勇敢冒险
                        </motion.p>
                        <motion.p initial={{ opacity: 0, scale: 2, rotateZ: "-180deg" }} animate={{ opacity: 1, scale: 1, rotateZ: "0deg" }} transition={{ duration: 0.8 }}>
                            丰富地过每一天
                        </motion.p>
                        <motion.p initial={{ opacity: 0, scale: 2, rotateZ: "180deg" }} animate={{ opacity: 1, scale: 1, rotateZ: "0deg" }} transition={{ duration: 0.8 }}>
                            快乐地看每一天
                        </motion.p>
                    </motion.div>

                    {/* 英文副标题 */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-sm md:text-base tracking-widest uppercase text-muted-foreground pt-6 border-b-3 text-shadow-gray-500 text-shadow-md"
                    >
                        Live in the present. Fear less. Explore freely.
                    </motion.p>
                </div>
                <div className="flex w-full justify-evenly items-center p-6">
                    <HoverCard openDelay={10} closeDelay={100}>
                        <HoverCardTrigger asChild>
                            <Button variant="outline">更新</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="flex w-64 flex-col gap-0.5">
                            <div className="font-semibold">@1.0.1</div>
                            <div>Some styles have been changed.</div>
                            <div className="text-muted-foreground mt-1 text-xs">
                                2026/2/17
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                            <Button variant="outline">特性</Button>
                        </HoverCardTrigger>

                        <HoverCardContent className="
                            w-72 rounded-xl p-4 space-y-4
                            bg-white dark:bg-zinc-900
                            border border-zinc-200 dark:border-zinc-800
                            shadow-md
                          ">
                            <div className="space-y-3 text-sm">

                                <div className="flex gap-3 items-start">
                                    <span>🌙</span>
                                    <div>
                                        <div className="font-medium">暗夜模式</div>
                                        <div className="text-muted-foreground text-xs">
                                            自动适配系统主题，支持浅色 / 深色切换
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <span>🔐</span>
                                    <div>
                                        <div className="font-medium">多种登录方式</div>
                                        <div className="text-muted-foreground text-xs">
                                            支持 GitHub 与邮箱登录
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <span>🎲</span>
                                    <div>
                                        <div className="font-medium">随机查看</div>
                                        <div className="text-muted-foreground text-xs">
                                            一键探索随机 Verse
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </HoverCardContent>
                    </HoverCard>

                </div>
            </div>
        </TabsContent>
    )
}
