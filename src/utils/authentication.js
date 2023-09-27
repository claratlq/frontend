import { Buffer } from 'buffer';
import System from "../models/system";
const isDev = import.meta.NODE_ENV !== "production";

const Authentication = {
    checkAuth: async function () {
        const { authenticated, userId } = await System.checkAuth();
        if (authenticated) {
            window.localStorage.setItem("user", userId);
            window.localStorage.setItem("AUTH_USER", userId);
        }
    },
};

export default Authentication;