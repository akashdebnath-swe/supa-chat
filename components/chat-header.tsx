"use client";

import { Button } from "./ui/button";

const ChatHeader = () => {
    return (
        <header className=''>
            <nav className='p-5 border-b flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-md'>Simple Chat</h1>
                    <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 bg-green-500 rounded-full animate-pulse' />
                        <span className='text-xs text-gray-400'>2 online</span>
                    </div>
                </div>

                <Button className='justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-alternative dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-brand-600 text-xs px-2.5 py-1 h-[26px]'>
                    Login
                </Button>
            </nav>
        </header>
    );
};

export default ChatHeader;
