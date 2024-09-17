import { Suspense } from "react";
import ListMessages from "./list-messages";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";
import Fallback from "./loader/Fallback";

const ChatContainer = async () => {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("messages").select("*,users(*)");

    // console.log(data);
    return (
        <Suspense fallback={<Fallback />}>
            <ListMessages />
            <InitMessages messages={data || []} />
        </Suspense>
    );
};

export default ChatContainer;
