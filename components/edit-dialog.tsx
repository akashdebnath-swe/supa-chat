import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMessage } from "@/lib/store";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

const EditDialog = () => {
    const { activeMessage, optimisticUpdateMessage } = useMessage(
        (state) => state
    );

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const handleEdit = useCallback(async () => {
        const supabase = createSupabaseBrowserClient();

        const text = inputRef.current.value.trim();

        if (text && activeMessage) {
            if (text === activeMessage.text) {
                document.getElementById("trigger-edit")?.click();
                return;
            }
            optimisticUpdateMessage({ ...activeMessage, text, is_edit: true });
            const { error } = await supabase
                .from("messages")
                .update({ text, is_edit: true })
                .eq("id", activeMessage.id);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Successfully updated the message");
            }

            document.getElementById("trigger-edit")?.click();
        } else {
            document.getElementById("trigger-edit")?.click();
            document.getElementById("trigger-delete")?.click();
        }
    }, [activeMessage, optimisticUpdateMessage]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.stopImmediatePropagation();
                handleEdit();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleEdit]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span id='trigger-edit'></span>
            </DialogTrigger>
            <DialogContent className='max-w-sm'>
                <DialogHeader>
                    <DialogTitle>Edit message</DialogTitle>
                    <DialogDescription>
                        Make changes to your message here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    id='message'
                    defaultValue={activeMessage?.text}
                    ref={inputRef}
                />
                <DialogFooter>
                    <Button type='submit' onClick={handleEdit}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;
