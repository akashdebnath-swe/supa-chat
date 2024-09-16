"use client";

import { lazy } from "react";
import { useMessage } from "@/lib/store";
import Message from "./message";
import EditDialog from "./edit-dialog";
const DeleteAlert = lazy(() => import("./delete-alert"));

const ListMessages = () => {
    const { messages } = useMessage((state) => state);
    return (
        <section className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
            <div className='flex-1'> </div>
            <div className='space-y-7'>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <DeleteAlert />
            <EditDialog />
        </section>
    );
};

export default ListMessages;
