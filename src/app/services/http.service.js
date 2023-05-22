import axios from "axios";
import { toast } from "react-toastify";
import configFire from "../config.json";
import localStorageService from "./localStorage.service";
import { httpAuth } from "../hooks/useAuth";

const http = axios.create({
    baseURL: configFire.apiEndPoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFire.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const expiresDate = localStorageService.getExpiresKey();
            const refreshToken = localStorageService.getRefreshKey();
            if (refreshToken && expiresDate > Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                });
            }
            const accessToken = localStorageService.getTokenKey();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
}

http.interceptors.response.use(
    (res) => {
        if (configFire.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Unexpected error");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
