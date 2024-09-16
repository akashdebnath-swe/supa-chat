"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Input } from "./ui/input";
import { toast } from "sonner";

const ChatInput = () => {
    const supabase = createSupabaseBrowserClient();

    const handleSendMessage = async (text: string) => {
        if (text) {
            const { error } = await supabase.from("messages").insert({ text });

            if (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className='p-5'>
            <Input
                placeholder='send message'
                onKeyDown={(e) => {
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
