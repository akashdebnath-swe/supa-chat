"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const LoginPage = () => {
    const supabase = createSupabaseBrowserClient();
    const handleLoginWithGithub = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK,
            },
        });

        console.log(data);
        console.log(error);
    };

    const handleLoginWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK,
            },
        });

        console.log(data);
        console.log(error);
    };

    return (
        <>
            <section className='w-full h-screen flex items-center justify-center'>
                <div className='w-full sm:max-w-md flex flex-col px-20 gap-2'>
                    <h1 className='text-2xl text-white'>Welcome back</h1>
                    <p className='text-sm mb-6 text-white'>
                        Sign in to your account
                    </p>

                    <Button
                        className='bg-muted flex items-center gap-4 border border-white border-opacity-10 hover:border-opacity-25 hover:bg-muted h-[40px] rounded-md mb-2 focus-visible:ring-primary text-white'
                        onClick={handleLoginWithGithub}
                    >
                        <GitHubLogoIcon width={20} height={20} />
                        Continue with GitHub
                    </Button>
                    <Button
                        className='bg-muted flex items-center gap-4 border border-white border-opacity-10 hover:border-opacity-25 hover:bg-muted h-[40px] rounded-md mb-3 focus-visible:ring-primary text-white'
                        onClick={handleLoginWithGoogle}
                    >
                        <Image
                            src='/google.svg'
                            width={20}
                            height={20}
                            alt='google icon'
                        />
                        Continue with Google
                    </Button>
                    <div className='flex items-center justify-between mb-3 gap-2'>
                        <div className='h-[1px] w-full bg-zinc-800' />
                        <span className='text-sm'>or</span>
                        <div className='h-[1px] w-full bg-zinc-800' />
                    </div>

                    <div className='flex flex-col mb-2'>
                        <Input
                            type='email'
                            placeholder='you@example.com'
                            id='user-email'
                            className=' focus-visible:ring-primary'
                        />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <Input
                            type='password'
                            placeholder='password'
                            id='user-password'
                            className='focus-visible:ring-primary'
                        />
                    </div>
                    <Button
                        className='focus-visible:ring-primary transition-all duration-200 ease-in cursor-not-allowed disabled:bg-zinc-600'
                        disabled
                    >
                        Log In
                    </Button>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
