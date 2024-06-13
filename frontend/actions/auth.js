import axiosInstance from '../axios/axios';
import cookie from "js-cookie";
import Router from "next/router";

export const handleResponse = (response) => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: "/signin",
                query: {
                    message: "Your session is expired. Please signin",
                },
            });
        });
    }
};

export const preSignup = (user) => {
    return axiosInstance.post('/pre-signup', user)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const signup = (user) => {
    return axiosInstance.post('/signup', user)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const superSignup = (user) => {
    return axiosInstance.post('/super-signup', user)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const signin = (user) => {
    return axiosInstance.post('/signin', user)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const signout = (next) => {
    removeCookie("token");
    removeLocalStorage("user");
    removeLocalStorage("loadedUser");
    next();

    return axiosInstance.get('/signout')
    .then((response) => {
        console.log("signout success");
    })
    .catch((err) => console.log(err));
};

// set cookie
export const setCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1,
        });
    }
};

export const removeCookie = (key) => {
    if (typeof window !== 'undefined') {
        cookie.remove(key, {
            expires: 1,
        });
    }
};

// get cookie
export const getCookie = (key) => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};

// localstorage
export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// authenticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie("token", data.token);
    setLocalStorage("user", data.user);
    next();
};

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie("token");
        if (cookieChecked) {
            if (localStorage.getItem("user")) {
                return JSON.parse(localStorage.getItem("user"));
            } else {
                return false;
            }
        }
    }
};

export const updateUser = (user, id, cb) => {
    if (isAuth() && isAuth()._id === id && typeof window !== 'undefined' && localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(user));
        cb();
    } else {
        cb();
    }
};

export const forgotPassword = (email) => {
    return axiosInstance.put('/forgot-password', email)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const resetPassword = (resetInfo) => {
    return axiosInstance.put('/reset-password', resetInfo)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const loginWithGoogle = (user) => {
    return axiosInstance.post('/google-login', user)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
