"use client"

import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function HomeTab() {
    return (
        <TabsContent value="home">
            <div className="flex min-h-full items-center justify-center px-6">
                <div className="text-center space-y-6">

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
                        className="text-sm md:text-base tracking-widest uppercase text-muted-foreground pt-6"
                    >
                        Live in the present. Fear less. Explore freely.
                    </motion.p>

                </div>
            </div>
        </TabsContent>
    )
}
