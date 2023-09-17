import AddRoomForm from "@/components/business/rooms/add-room-form";
import React from "react";

export default async function modal() {
    return <>
        <div className={"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"}/>
        <div
            className={"fixed left-[50%] top-[50%] z-50 w-full max-w-lg max-h-screen translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full overflow-y-auto overscroll-y-contain"}>
            <AddRoomForm/>
        </div>
    </>
}