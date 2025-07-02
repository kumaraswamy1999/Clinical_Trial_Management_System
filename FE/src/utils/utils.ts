export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.href = "/login";

};

export const getLoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");
    return user;
};
