import { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const MessageMenu = () => {
    const handleMessageDelete = () => {
        console.log("delete message");
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event);
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
                    <DropdownMenuItem className='dropDownMenuItem'>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='dropDownMenuItem'
                        onClick={handleMessageDelete}
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
