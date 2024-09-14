"use client";

import React, { useEffect, useRef } from "react";
import { userState, useUser } from "./user";

const InitUser = ({ user }: userState) => {
    const initState = useRef(false);

    useEffect(() => {
        if (!initState.current) {
            useUser.setState({ user });
        }

        initState.current = true;
    }, [user]);
    return <></>;
};

export default InitUser;
