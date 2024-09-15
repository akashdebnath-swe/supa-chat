const ChatContainer = () => {
    return (
        <section className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
            <div className='flex-1 bg-zinc-900'></div>
            <div className='space-y-7'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                    (value) => (
                        <div className='flex gap-2' key={value}>
                            <div className='h-10 w-10 bg-green-500 rounded-full'></div>
                            <div className='flex-1'>
                                <div className='flex items-center gap-1'>
                                    <h1 className='font-bold'>Akash</h1>
                                    <h1 className='text-xs text-gray-400'>
                                        {new Date().toDateString()}
                                    </h1>
                                </div>
                                <p className='text-gray-300 text-sm'>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Rerum, provident.
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default ChatContainer;
