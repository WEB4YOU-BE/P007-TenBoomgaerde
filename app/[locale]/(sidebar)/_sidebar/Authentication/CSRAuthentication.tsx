"use client";

import {
    CaretUpIcon,
    IdentificationBadgeIcon,
    SignInIcon,
    SignOutIcon,
    SpinnerBallIcon,
    UserCircleDashedIcon,
    UserCircleIcon,
    UserCirclePlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useMemo } from "react";

import LoadingSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/Loading";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/atoms/Sidebar";
import Skeleton from "@/components/atoms/skeleton";
import getUser from "@/service/authentication/getUser";
import getUserById from "@/service/users/getUserById";

const SidebarAuthentication = () => {
    const {
        data: user,
        isFetching: fetchingUser,
        isSuccess,
    } = useQuery({ queryFn: getUser, queryKey: ["authenticatedUser"] });
    const {
        data: account,
        isFetching: fetchingAccount,
        isPaused,
    } = useQuery({
        enabled: !!user?.id,
        queryFn: () => getUserById({ userId: user?.id || "" }),
        queryKey: ["user", user?.id],
    });

    const isLoading = useMemo(
        () => !account && (fetchingAccount || fetchingUser),
        [account, fetchingAccount, fetchingUser]
    );

    if ((fetchingUser || fetchingAccount) && (isPaused || !isSuccess))
        return <LoadingSidebarMenu items={1} />;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="group/dropdown">
                            {isLoading && (
                                <SpinnerBallIcon className="animate-spin" />
                            )}
                            {isLoading && (
                                <Skeleton className="w-full h-full" />
                            )}
                            {!account && !isLoading && <UserCircleDashedIcon />}
                            {!account && !isLoading && (
                                <span>Niet aangemeld</span>
                            )}
                            {account && <UserCircleIcon />}
                            {account &&
                                `${account.firstname || ""} ${account.lastname || ""}`.trim()}
                            <CaretUpIcon className="ml-auto transition-transform group-data-[state=open]/dropdown:rotate-180" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        side="top"
                        style={{
                            maxHeight:
                                "var(--radix-dropdown-menu-content-available-height)",
                            width: "var(--radix-dropdown-menu-trigger-width)",
                        }}
                    >
                        {account ? (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href="/account/personal-information/">
                                        <IdentificationBadgeIcon />
                                        <span>Persoonlijke gegevens</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild variant="destructive">
                                    <Link href="/authentication/sign-out/">
                                        <SignOutIcon />
                                        <span>Meld af</span>
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href="/authentication/sign-in/">
                                        <SignInIcon />
                                        <span>Aanmelden</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/authentication/sign-up/">
                                        <UserCirclePlusIcon />
                                        <span>Registreren</span>
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default SidebarAuthentication;
