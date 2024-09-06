import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AuthError = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center flex-col'>
            <p>Something went wrong.</p>
            <p>Check your internet connection.</p>

            <Button
                className='h-[26px] cursor-pointer ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-[2px] focus-visible:outline-primary focus-visible:outline-offset-1 text-foreground bg-background dark:bg-muted border border-white border-opacity-15 hover:border-opacity-25 text-xs px-2.5 py-1 mt-4'
                asChild
            >
                <Link href='/'>Try Again</Link>
            </Button>
        </div>
    );
};

export default AuthError;
