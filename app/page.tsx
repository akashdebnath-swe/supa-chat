import ChatHeader from "@/components/chat-header";
import InitUser from "@/lib/store/initUser";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // @cc- console.log(user);

    return (
        <main className='w-full md:max-w-md mx-auto md:py-10 h-screen'>
            <div className='h-full border rounded-md'>
                <ChatHeader user={user} />
            </div>
            <InitUser user={user} />
        </main>
    );
}
