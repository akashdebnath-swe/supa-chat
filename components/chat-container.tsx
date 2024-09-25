import { Suspense } from "react";
import ListMessages from "./list-messages";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";
import Fallback from "./loader/Fallback";
import { LIMIT_MESSAGE } from "@/lib/constant";

const ChatContainer = async () => {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
        .from("messages")
        .select("*,users(*)")
        .range(0, LIMIT_MESSAGE)
        .order("created_at", { ascending: false });

    console.log(data);
    return (
        <Suspense fallback={<Fallback />}>
            <ListMessages />
            <InitMessages messages={data?.reverse() || []} />
        </Suspense>
    );
};

export default ChatContainer;
