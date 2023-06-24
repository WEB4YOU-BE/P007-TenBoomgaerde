import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/Hover-card";

export default function Index() {
    return <main className={"w-full min-h-[100svh]"}>
        <div className={"px-4 pt-6"}>
            <div className={"grid gap-4 grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-2"}>
                <div
                    className={"p-4 border border-gray-200 rounded-lg shadow-sm col-span-2 xl:col-span-3 2xl:col-span-4 sm:p-6 xl:row-span-2"}>
                    <Tabs defaultValue={"Deze week"}>
                        <div className={"mb-4 border-b border-gray-200"}>
                            <TabsList className={"flex flex-wrap -mb-px text-sm font-medium text-center"}>
                                <div className={"mr-2"}>
                                    <TabsTrigger value={"Deze week"}
                                                 className={"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-green-600 data-[state=active]:border-green-600"}>Deze
                                        week</TabsTrigger>
                                </div>
                                <div className={"mr-2"}>
                                    <TabsTrigger value={"Te controleren"}
                                                 className={"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-green-600 data-[state=active]:border-green-600"}>Te
                                        controleren</TabsTrigger>
                                </div>
                            </TabsList>
                        </div>
                        <TabsContent value={"Deze week"}>
                            <table className={"min-w-full divide-y divide-gray-200 table-fixed "}>
                                <thead className={"bg-gray-100"}>
                                <tr>
                                    {
                                        [
                                            'Datum',
                                            'Uur',
                                            'Naam',
                                            'Tel',
                                            'Details'
                                        ].map((th, index) => (
                                            <th key={index} scope={"col"}
                                                className={"p-4 text-xs font-medium text-left text-gray-500 uppercase"}>
                                                {th}
                                            </th>
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody className={"divide-y divide-gray-200"}>

                                </tbody>
                            </table>
                        </TabsContent>
                        <TabsContent value={"Te controleren"}>
                            <table className={"min-w-full divide-y divide-gray-200 table-fixed "}>
                                <thead className={"bg-gray-100"}>
                                <tr>
                                    {
                                        [
                                            'Datum',
                                            'Uur',
                                            'Naam',
                                            'Tel',
                                            'Details'
                                        ].map((th, index) => (
                                            <th key={index} scope={"col"}
                                                className={"p-4 text-xs font-medium text-left text-gray-500 uppercase"}>
                                                {th}
                                            </th>
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody className={"divide-y divide-gray-200"}>

                                </tbody>
                            </table>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className={"p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6"}>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <h2 className={"mb-4 pb-2 text-lg font-semibold text-center border-b border-gray-200"}>Nieuwe
                                reserveringen</h2>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p>Dit zijn de nieuwe reserveringen vanaf maandag deze week.</p>
                        </HoverCardContent>
                    </HoverCard>
                    <p className={"text-6xl font-bold text-green-600 sm:text-8xl text-center"}>6</p>
                </div>
                <div className={"p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6"}>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <h2 className={"mb-4 pb-2 text-lg font-semibold text-center border-b border-gray-200"}>Te
                                controleren</h2>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p>Dit zijn de te controleren reserveringen.</p>
                        </HoverCardContent>
                    </HoverCard>
                    <p className={"text-6xl font-bold text-green-600 sm:text-8xl text-center"}>3</p>
                </div>
            </div>
        </div>
    </main>;
}
