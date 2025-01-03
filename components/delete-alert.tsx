import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMessage } from "@/lib/store";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { toast } from "sonner";

const DeleteAlert = () => {
    const { activeMessage, optimisticDeleteMessage } = useMessage(
        (state) => state
    );

    const handleDeleteMessage = async () => {
        const supabase = createSupabaseBrowserClient();
        if (activeMessage?.id) {
            optimisticDeleteMessage(activeMessage.id);
            const { error } = await supabase
                .from("messages")
                .delete()
                .eq("id", activeMessage.id);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Successfully deleted the message");
            }
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <span id='trigger-delete'></span>
            </AlertDialogTrigger>
            <AlertDialogContent className='max-w-sm rounded-md'>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want you delete this message :{" "}
                        {activeMessage?.text}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteMessage}>
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAlert;
