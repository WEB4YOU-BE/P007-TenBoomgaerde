import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

import SidebarAuthentication from "@/app/[locale]/(sidebar)/_sidebar/Authentication/CSRAuthentication";
import getUser from "@/service/authentication/getUser";
import { getQueryClient } from "@/utils/query/queryClient";

const PrefetchSidebarAuthentication = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarAuthentication />
        </HydrationBoundary>
    );
};

export default PrefetchSidebarAuthentication;
