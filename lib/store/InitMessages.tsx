"use client";

import React, { useEffect, useRef } from "react";
import { Imessage, useMessage } from "./index";
import { LIMIT_MESSAGE } from "../constant";

const InitMessages = ({ messages }: { messages: Imessage[] }) => {
    const initState = useRef(false);
    const hasMore = messages.length >= LIMIT_MESSAGE;

    useEffect(() => {
        if (!initState.current) {
            useMessage.setState({ messages, hasMore });
        }

        initState.current = true;
    }, [messages, hasMore]);
    return <></>;
};

export default InitMessages;
