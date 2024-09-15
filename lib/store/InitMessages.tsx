"use client";

import React, { useEffect, useRef } from "react";
import { messageState, useMessage } from "./index";

const InitMessages = ({ messages }: messageState) => {
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
