"use client";

import { lazy, useEffect, useRef, useState } from "react";
import { Imessage, useMessage } from "@/lib/store";
import Message from "./message";
import EditDialog from "./edit-dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
const DeleteAlert = lazy(() => import("./delete-alert"));

const ListMessages = () => {
    const [userScrolled, setUserScrolled] = useState<boolean>(false);

    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const {
        messages,
        addMessage,
        optimisticIds,
        optimisticDeleteMessage,
        optimisticUpdateMessage,
    } = useMessage((state) => state);

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
                async (payload) => {
                    console.log("Change received by update!", payload);
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

                        optimisticUpdateMessage(newMessage as Imessage);
                    }
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [
        supabase,
        addMessage,
        optimisticIds,
        optimisticDeleteMessage,
        optimisticUpdateMessage,
    ]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            scrollToDown();
        }
    }, [messages]);

    const handleOnScroll = () => {
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            const isScroll =
                scrollContainer.scrollTop <
                scrollContainer.scrollHeight -
                    scrollContainer.clientHeight -
                    10;

            setUserScrolled(isScroll);
        }
    };

    const scrollToDown = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };

    return (
        <section
            className='flex-1 flex flex-col p-5 h-full overflow-y-auto'
            ref={scrollRef}
            onScroll={handleOnScroll}
        >
            <div className='flex-1'> </div>
            <div className='space-y-7'>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            {userScrolled && (
                <div className='absolute bottom-20 left-0 w-full'>
                    <div
                        className='w-6 h-6 text-white bg-blue-500 rounded-full flex items-center justify-center cursor-pointer mx-auto border hover:scale-110 transition-all duration-200 ease-in'
                        onClick={scrollToDown}
                    >
                        <ArrowDown size={18} />
                    </div>
                </div>
            )}
            <DeleteAlert />
            <EditDialog />
        </section>
    );
};

export default ListMessages;
