"use client";

import { lazy, useEffect, useRef } from "react";
import { Imessage, useMessage } from "@/lib/store";
import Message from "./message";
import EditDialog from "./edit-dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { toast } from "sonner";
const DeleteAlert = lazy(() => import("./delete-alert"));

const ListMessages = () => {
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const { messages, addMessage, optimisticIds, optimisticDeleteMessage } =
        useMessage((state) => state);

    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        const channel = supabase
            .channel("chat-room")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                async (payload) => {
                    console.log("Change received by insert!", payload);

                    const isMessage = optimisticIds.includes(payload.new.id);
                    console.log(isMessage);
                    if (!isMessage) {
                        const { error, data } = await supabase
                            .from("users")
                            .select("*")
                            .eq("id", payload.new.send_by)
                            .single();

                        if (error) {
                            toast.error(error.message);
                        } else {
                            const newMessage = {
                                ...payload.new,
                                users: data,
                            };

                            addMessage(newMessage as Imessage);
                        }
                    }
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "messages" },
                (payload) => {
                    console.log("Change received by delete!", payload);
                    optimisticDeleteMessage(payload.old.id);
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "messages" },
                (payload) => {
                    console.log("Change received by update!", payload);
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [supabase, addMessage, optimisticIds, optimisticDeleteMessage]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <section
            className='flex-1 flex flex-col p-5 h-full overflow-y-auto'
            ref={scrollRef}
        >
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
