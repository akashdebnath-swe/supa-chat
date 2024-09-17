"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import google, { CredentialResponse } from "google-one-tap";

const OneTapComponent = () => {
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const generateNonce = async (): Promise<string[]> => {
        const nonce = btoa(
            String.fromCharCode(
                ...Array.from(crypto.getRandomValues(new Uint8Array(32)))
            )
        );
        const encoder = new TextEncoder();
        const encodedNonce = encoder.encode(nonce);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedNonce = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        return [nonce, hashedNonce];
    };

    useEffect(() => {
        const handleGoogleOneTap = async () => {
            const [nonce, hashedNonce] = await generateNonce();

            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error getting session", error);
            }
            if (data.session) {
                router.push("/");
                return;
            }

            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                callback: async (response: CredentialResponse) => {
                    try {
                        const { data, error } =
                            await supabase.auth.signInWithIdToken({
                                provider: "google",
                                token: response.credential,
                                nonce,
                            });

                        if (error) throw error;

                        router.push("/");
                    } catch (error) {
                        console.error(
                            "Error logging in with Google One Tap",
                            error
                        );
                    }
                },
                nonce: hashedNonce,
                use_fedcm_for_prompt: true,
            });

            google.accounts.id.prompt();
        };

        const onLoad = () => handleGoogleOneTap();

        window.addEventListener("load", onLoad);

        return () => window.removeEventListener("load", onLoad);
    }, [router, supabase]);

    return (
        <>
            <Script src='https://accounts.google.com/gsi/client' />
            <div id='oneTap' className='fixed top-0 right-0 z-[100]' />
        </>
    );
};

export default OneTapComponent;
