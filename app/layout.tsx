import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "supa-chat",
    description: "supa-chat using next.js supabase and socket.io",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased relative`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster
                        position="top-center"
                        closeButton
                        duration={2000}
                    />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
