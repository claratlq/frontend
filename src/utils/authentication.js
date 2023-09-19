import { useState } from "react";
import { Buffer } from 'buffer';
import { GoogleLogin } from '@react-oauth/google';
import System from "../models/system";
const isDev = import.meta.NODE_ENV !== "production";

function parseJwtPayload(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const Authentication = {
    checkGoogleAuth: async function (resp) {
        if (isDev) {
            const parsedCredentials = parseJwtPayload(resp.credential);
            window.localStorage.setItem("user", parsedCredentials.name);
            window.localStorage.setItem("googleAuthToken", resp.credential);
            window.location.reload();
        }
        else {
            const { authenticated } = await System.checkGoogleAuth(resp.credential);
            console.log(authenticated)

            if (authenticated) {
                const parsedCredentials = parseJwtPayload(resp.credential);
                window.localStorage.setItem("user", parsedCredentials.name);
                window.localStorage.setItem("googleAuthToken", resp.credential);
                window.location.reload();
            }
        }
    },
};

export default Authentication;