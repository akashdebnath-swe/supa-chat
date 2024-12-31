import ChatAbout from "@/components/chat-about";
import ChatContainer from "@/components/chat-container";
import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import InitUser from "../lib/store/initUser";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <main className="w-full md:max-w-md mx-auto md:py-10 h-screen">
            <div className="h-full border rounded-md flex flex-col relative">
                <ChatHeader user={user} />
                {user ? (
                    <>
                        <ChatContainer />
                        <ChatInput />
                    </>
                ) : (
                    <ChatAbout />
                )}
            </div>
            <InitUser user={user} />
        </main>
    );
}
