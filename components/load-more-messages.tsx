import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "./ui/button";
import { LIMIT_MESSAGE } from "@/lib/constant";
import { useMessage } from "@/lib/store";
import { toast } from "sonner";
import { getFromAndTo } from "@/lib/utils";

const LoadMoreMessages = () => {
    const { setMesssages, page } = useMessage((state) => state);

    const fetchMore = async () => {
        const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);

        const supabase = createSupabaseBrowserClient();

        const { data, error } = await supabase
            .from("messages")
            .select("*, users(*)")
            .range(from, to)
            .order("created_at", { ascending: false });

        if (error) {
            toast.error(error.message);
        } else {
            console.log(data);
            setMesssages(data.reverse());
        }
    };

    return (
        <div className='w-full flex items-center justify-center'>
            <Button
                className='h-[26px] cursor-pointer ease-out duration-200 
	rounded-md outline-none transition-all outline-0 focus-visible:outline-[2px] 
	focus-visible:outline-primary focus-visible:outline-offset-1 text-foreground 
	bg-background dark:bg-muted border border-white border-opacity-15 
	hover:border-opacity-25 text-xs px-2.5 py-1 hover:bg-gray-50'
                onClick={fetchMore}
            >
                load more
            </Button>
        </div>
    );
};

export default LoadMoreMessages;
