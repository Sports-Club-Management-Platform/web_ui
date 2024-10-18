let HOST, BASE_URL, WS_SCHEME;

const scheme = {
    HTTP: 'http://',
    HTTPS: 'https://',
};

if (import.meta.env.PROD) {
    HOST = 'www.google.com';
    BASE_URL = `${scheme.HTTPS}${HOST}`;
} else {
    HOST = 'localhost';
    BASE_URL = `${scheme.HTTP}${HOST}:8000`;
}

const config = {
    PRODUCTION: import.meta.env.PROD,
    HOST,
    BASE_URL,
    API_USER_URL: `${BASE_URL}/auth`,
    API_GAME_URL: `${BASE_URL}/game`,
    API_CLUBS_URL: `${BASE_URL}/clubs`,
    API_PAVILIONS_URL: `${BASE_URL}/pavilions`,
};

export default config;