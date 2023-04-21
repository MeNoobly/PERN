import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const { data } = await $host.post(
        `${process.env.REACT_APP_API_URL}/api/user/registration`,
        {
            email,
            password,
            role: "ADMIN",
        }
    );

    localStorage.setItem("token", data.token);

    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
            email,
            password,
        }
    );

    localStorage.setItem("token", data.token);

    return jwt_decode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get(
        `${process.env.REACT_APP_API_URL}/api/user/auth`
    );

    localStorage.setItem("token", data.token);

    return jwt_decode(data.token);
};
