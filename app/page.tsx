import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import MineVerse from "@/components/mine-verse"
import AddVerseDialog from "@/components/add-verse-dialog"
import RandomVerseWrapper from "@/components/random-verse-wrapper";
import AllVerseWrapper from "@/components/all-verse-wrapper";
import HomeTab from "@/components/home";
import {ModeToggle} from "@/components/theme-toggle";

export default function Home() {

    return (
        <>
            <Header />

            <main className="max-w-3/4 mx-auto p-6">
                <Tabs defaultValue="home">
                    <TabsList className="fixed flex flex-col left-4 bottom-[30%] items-center justify-center gap-4 ">
                        <TabsTrigger value="home">首页</TabsTrigger>
                        <TabsTrigger value="random">随机</TabsTrigger>
                        <TabsTrigger value="mine">我的</TabsTrigger>
                        <TabsTrigger value="all">全部</TabsTrigger>
                    </TabsList>

                    <TabsContent value="home">
                        <HomeTab />
                    </TabsContent>

                    <TabsContent value="random">
                        <RandomVerseWrapper />
                    </TabsContent>

                    <TabsContent value="mine">
                        <MineVerse />
                    </TabsContent>

                    <TabsContent value="all">
                        <AllVerseWrapper />
                    </TabsContent>
                </Tabs>
            </main>

            <ModeToggle />
            <AddVerseDialog />
        </>
    )
}
