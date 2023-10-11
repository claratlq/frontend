import System from "../models/system";

const Authentication = {
    checkAuth: async function () {
        const { authenticated, userId } = await System.checkAuth();
        if (authenticated) {
            window.localStorage.setItem("user", userId);
            window.localStorage.setItem("AUTH_USER", userId);
        } else {
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("AUTH_USER", null);
        }
    },
};

export default Authentication;
