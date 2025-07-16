import React, { type ReactNode, Suspense } from "react";

import SidebarAuthentication from "@/app/[locale]/(sidebar)/_sidebar/Authentication";
import DashboardSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/DashboardSidebarMenu";
import LoadingSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/Loading";
import OrganisationSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/OrganisationsSidebarMenu";
import PublicSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/PublicSidebarMenu";
import ReservationSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/ReservationSidebarMenu";
import SidebarHeaderMenu from "@/app/[locale]/(sidebar)/_sidebar/SidebarHeaderMenu";
import SidebarComponent, {
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarRail,
    SidebarSeparator,
} from "@/components/atoms/Sidebar";

const Sidebar = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SidebarComponent collapsible="icon" variant="inset">
                <SidebarHeader>
                    <SidebarHeaderMenu />
                    <SidebarSeparator />
                </SidebarHeader>
                <SidebarContent>
                    <PublicSidebarMenu />
                    <ReservationSidebarMenu />
                    <OrganisationSidebarMenu />
                    <DashboardSidebarMenu />
                </SidebarContent>
                <SidebarFooter>
                    <SidebarSeparator />
                    <Suspense fallback={<LoadingSidebarMenu />}>
                        <SidebarAuthentication />
                    </Suspense>
                </SidebarFooter>
                <SidebarRail />
            </SidebarComponent>
            <SidebarInset>{children}</SidebarInset>
        </>
    );
};

export default Sidebar;
