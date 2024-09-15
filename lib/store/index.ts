import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export interface Imessage {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        avatar_url: string | null;
        created_at: string;
        display_name: string;
        email: string | null;
        id: string;
    } | null;
}

export interface userState {
    user: User | null;
}
export interface messageState {
    messages: Imessage[];
}

export const useUser = create<userState>()(() => ({
    user: null,
}));

export const useMessage = create<messageState>()(() => ({
    messages: [],
}));
