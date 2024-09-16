import { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Imessage, useMessage } from "@/lib/store";

interface MessageMenuProps {
    message: Imessage;
}

const MessageMenu = ({ message }: MessageMenuProps) => {
    const { setActiveMessage } = useMessage((state) => state);

    const handleMessageDelete = () => {
        console.log("delete message");
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "Delete") {
                handleMessageDelete();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild autoFocus={false}>
                    <MoreHorizontal size={16} className='cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 bg-background'>
                    <DropdownMenuItem
                        className='dropDownMenuItem'
                        onClick={() => {
                            document.getElementById("trigger-edit")?.click();
                            setActiveMessage(message);
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='dropDownMenuItem'
                        onClick={() => {
                            document.getElementById("trigger-delete")?.click();
                            setActiveMessage(message);
                        }}
                    >
                        Delete
                        <DropdownMenuShortcut>ctrl + del</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MessageMenu;
