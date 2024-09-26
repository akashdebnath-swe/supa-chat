"use client";

import { User } from "@supabase/supabase-js";
import UserMenu from "./user-menu";
import ChatPresence from "./ChatPresence";

interface ChatHeaderProps {
    user: User | null;
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
    return (
        <header>
            <nav className='px-5 py-2 border-b flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-md'>Connect</h1>
                    <ChatPresence />
                </div>

                <UserMenu
                    username={user?.user_metadata?.full_name}
                    profileImg={user?.user_metadata?.avatar_url}
                    email={user?.email}
                />
            </nav>
        </header>
    );
};

export default ChatHeader;
