import { Imessage } from "@/lib/store";
import UserProfile from "./user-profile";

interface MessageProps {
    message: Imessage;
}

const Message = ({ message }: MessageProps) => {
    return (
        <>
            <div className='flex gap-2'>
                <UserProfile
                    img={
                        message.users?.avatar_url ||
                        `https://api.multiavatar.com/${message.send_by}.svg`
                    }
                />
                <div className='flex-1'>
                    <div className='flex items-center gap-1'>
                        <h1 className='font-bold text-sm'>
                            {message.users?.display_name}
                        </h1>
                        <h1 className='text-xs text-gray-400'>
                            {new Date(message.created_at).toDateString()}
                        </h1>
                    </div>
                    <p className='text-gray-300 text-sm'>{message.text}</p>
                </div>
            </div>
        </>
    );
};

export default Message;
