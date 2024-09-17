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
    activeMessage: Imessage | undefined;
    optimisticIds: string[];
    addMessage: (message: Imessage) => void;
    setActiveMessage: (message: Imessage | undefined) => void;
    deleteMessage: (messageId: string) => void;
    optimisticUpdateMessage: (message: Imessage) => void;
    setOptimisticIds: (messageId: string) => void;
}

export const useUser = create<userState>(() => ({
    user: null,
}));

export const useMessage = create<messageState>((set) => ({
    messages: [],
    activeMessage: undefined,
    optimisticIds: [],
    setOptimisticIds: (messageId) => set((state) => {
        return {
            optimisticIds: [...state.optimisticIds, messageId]
        }
    }),
    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    setActiveMessage: (message) => set(() => ({ activeMessage: message })),
    deleteMessage: (id) =>
        set((state) => {
            return {
                messages: state.messages.filter((message) => message.id !== id),
            };
        }),
    optimisticUpdateMessage: (updatedMessage) =>
        set((state) => {
            return {
                messages: state.messages.filter((message) => {
                    if (message.id === updatedMessage.id) {
                        (message.text = updatedMessage.text),
                            (message.is_edit = updatedMessage.is_edit);
                    }

                    return message;
                }),
            };
        }),
}));
