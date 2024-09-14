import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export interface userState {
    user: User | null;
}

export const useUser = create<userState>()(() => ({
    user: null,
}));
