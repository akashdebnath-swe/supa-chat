import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserProfile from "./user-profile";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useTheme } from "next-themes";
import Link from "next/link";

interface UserMenuProps {
    username?: string;
    profileImg: string;
    email?: string;
}

export default function UserMenu({
    username,
    profileImg,
    email,
}: UserMenuProps) {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=akashdebnathwd@gmail.com&su=Support%20Request&body=Hello%20Support,`;

    const handleLogout = async () => {
        await supabase.auth.signOut({ scope: "local" });
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild autoFocus={false}>
                <Button
                    variant='ghost'
                    className='hover:bg-secondary border-none focus-visible:ring-1 focus-visible:ring-secondary outline-none outline-0'
                >
                    <UserProfile username={username} img={profileImg} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 bg-background'>
                {email && (
                    <>
                        <DropdownMenuLabel className='text-xs'>
                            {email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem className='dropDownMenuItem'>
                    <Link
                        href={"https://github.com/little-kaii/simple-chat"}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        GitHub
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='dropDownMenuItem'>
                    <Link
                        href={gmailLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Support
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className='dropDownMenuItem'>
                    Docs soon
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className='text-xs'>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem
                        value='dark'
                        className='dropDownMenuItem'
                    >
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value='light'
                        className='dropDownMenuItem'
                    >
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value='system'
                        className='dropDownMenuItem'
                    >
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='dropDownMenuItem'
                    onClick={handleLogout}
                >
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
