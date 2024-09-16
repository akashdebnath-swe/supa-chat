"use client";

import { useMessage } from "@/lib/store";
import Message from "./message";

const ListMessages = () => {
    const messages = useMessage((state) => state.messages);

    console.log(messages);

    return (
        <section className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
            <div className='flex-1 bg-zinc-900'></div>
            <div className='space-y-7'>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
        </section>
    );
};

export default ListMessages;
