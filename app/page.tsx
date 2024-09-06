import ChatHeader from "@/components/chat-header";

export default function Home() {
    return (
        <main className='max-w-3xl mx-auto md:py-10 h-screen'>
            <div className='h-full border rounded-md'>
                <ChatHeader />
            </div>
        </main>
    );
}
