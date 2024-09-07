import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface UserProfileProps {
    username?: string;
    img: string;
    className?: string;
    width?: number;
    height?: number;
}

const UserProfile = ({
    username,
    img,
    className,
    width = 25,
    height = 25,
}: UserProfileProps) => {
    return img ? (
        <div
            className={cn("flex items-center gap-2 cursor-pointer", className)}
        >
            <Image
                src={img}
                width={width}
                height={height}
                alt='profile-img'
                className=' rounded-full'
            />
            {username && <span className='text-xs'>{username}</span>}
        </div>
    ) : (
        <div className='flex items-center gap-2'>
            <Skeleton
                className='rounded-full bg-zinc-700'
                style={{ width: `${width}px`, height: `${height}px` }}
            />

            <Skeleton className='w-[100px] h-4 bg-zinc-700' />
        </div>
    );
};

export default UserProfile;
