import React from "react";

import Skeleton from "@/components/atoms/Skeleton";

const Loading = () => (
    <main className="w-full h-full flex flex-col justify-center items-center">
        <Skeleton className="w-full max-w-xs aspect-square rounded-xl" />
    </main>
);

export default Loading;
