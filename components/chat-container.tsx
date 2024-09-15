import { Suspense } from "react";
import ListMessages from "./list-messages";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";

const ChatContainer = async () => {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("messages").select("*,users(*)");

    return (
        <Suspense fallback={"loading..."}>
            <ListMessages />
            <InitMessages messages={data || []} />
        </Suspense>
    );
};

export default ChatContainer;
