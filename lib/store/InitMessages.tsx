"use client";

import React, { useEffect, useRef } from "react";
import { Imessage, useMessage } from "./index";

const InitMessages = ({ messages }: { messages: Imessage[] }) => {
    const initState = useRef(false);

    useEffect(() => {
        if (!initState.current) {
            useMessage.setState({ messages });
        }

        initState.current = true;
    }, [messages]);
    return <></>;
};

export default InitMessages;
