"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Imessage, useMessage, useUser } from "@/lib/store";

const ChatInput = () => {
    const supabase = createSupabaseBrowserClient();
    const user = useUser((state) => state.user);
    const { addMessage, setOptimisticIds } = useMessage((state) => state);

    const handleSendMessage = async (text: string) => {
        if (text) {
            if (user) {
                const newMessage: Imessage = {
                    id: uuidv4(),
                    text,
                    send_by: user.id,
                    is_edit: false,
                    created_at: new Date().toISOString(),
                    users: {
                        avatar_url: user.user_metadata.avatar_url,
                        created_at: user.created_at,
                        display_name: user.user_metadata.full_name,
                        email: user.user_metadata.email,
                        id: user.id,
                    },
                };

                addMessage(newMessage);
                setOptimisticIds(newMessage.id);

                const { error } = await supabase
                    .from("messages")
                    .insert({ text });

                if (error) {
                    toast.error(error.message);
                }
            }
        }
    };

    return (
        <div className='p-5'>
            <Input
                placeholder='send message'
                onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") {
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                    }
                }}
            />
        </div>
    );
};

export default ChatInput;
