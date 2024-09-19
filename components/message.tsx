import { Imessage, useUser } from "@/lib/store";
import UserProfile from "./user-profile";
import { lazy } from "react";
const MessageMenu = lazy(() => import("./message-menu"));

interface MessageProps {
    message: Imessage;
}

const Message = ({ message }: MessageProps) => {
    const user = useUser((state) => state.user);

    return (
        <>
            <div className='flex gap-2'>
                <div>
                    <UserProfile
                        img={
                            message.users?.avatar_url ||
                            `https://api.multiavatar.com/${message.send_by}.svg`
                        }
                    />
                </div>
                <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-gray-700 dark:text-gray-200 font-semibold text-xs'>
                                    {message.users?.display_name}
                                </h1>
                                {message.is_edit && (
                                    <span className='text-xs text-gray-400'>
                                        Edited
                                    </span>
                                )}
                            </div>
                            <span className='text-xs text-gray-500'>
                                {new Date(message.created_at).toDateString()}
                            </span>
                        </div>
                        {message.users?.id === user?.id && (
                            <MessageMenu message={message} />
                        )}
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm'>
                        {message.text}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Message;
