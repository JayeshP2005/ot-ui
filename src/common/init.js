export const init = {
    isLoggedin: typeof window !== "undefined" && sessionStorage.getItem("token") ? true : false
};
