import axios from "axios";

const $host = axios.create({
    baseUrl: process.env.REACT_APP_API_URL,
    timeout: 1000,
});

const $authHost = axios.create({
    baseUrl: process.env.REACT_APP_API_URL,
    timeout: 1000,
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
