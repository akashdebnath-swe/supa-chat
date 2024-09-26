"use client";
import { useUser } from "@/lib/store";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import React, { useEffect, useState } from "react";

export default function ChatPresence() {
    const user = useUser((state) => state.user);
    const supabase = createSupabaseBrowserClient();
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        const channel = supabase.channel("room1");
        channel
            .on("presence", { event: "sync" }, () => {
                const userIds = [];
                for (const id in channel.presenceState()) {
                    // @ts-expect-error user_id is not present in types but present in data.
                    userIds.push(channel.presenceState()[id][0].user_id);
                }
                // it will create a array of unique ids
                const uniqueUserIds = Array.from(new Set(userIds));
                console.log("unique ids: ", uniqueUserIds);
                setOnlineUsers(uniqueUserIds.length);
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({
                        online_at: new Date().toISOString(),
                        user_id: user?.id,
                    });
                }
            });
    }, [user, supabase]);

    if (!user) {
        return;
    }

    return (
        <div className='flex items-center gap-2'>
            <div className='h-2 w-2 bg-green-500 rounded-full animate-pulse' />
            <span className='text-xs text-gray-400'>{onlineUsers}</span>
        </div>
    );
}
