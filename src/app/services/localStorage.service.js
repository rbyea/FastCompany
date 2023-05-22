const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const LOCAL_USERID_KEY = "local-user-id";

export function setTokens({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem(LOCAL_USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function removeAllKey() {
    localStorage.removeItem(LOCAL_USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getTokenKey() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshKey() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresKey() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getLocalIdKey() {
    return localStorage.getItem(LOCAL_USERID_KEY);
}

const localStorageService = {
    setTokens,
    getTokenKey,
    getRefreshKey,
    getExpiresKey,
    getLocalIdKey,
    removeAllKey
};

export default localStorageService;
