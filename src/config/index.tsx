let HOST, BASE_URL_USER, BASE_URL, WS_SCHEME, BASE_URL_GAME;

const scheme = {
    HTTP: 'http://',
    HTTPS: 'https://',
};

if (import.meta.env.PROD) {
    HOST = 'www.google.com';
    BASE_URL = `${scheme.HTTPS}${HOST}`;
} else {
    HOST = 'localhost';
    BASE_URL_USER = `${scheme.HTTP}${HOST}:8000`;
    BASE_URL_GAME = `${scheme.HTTP}${HOST}:8002`;
}

const config = {
    PRODUCTION: import.meta.env.PROD,
    HOST,
    BASE_URL_USER,
    API_USER_URL: `${BASE_URL_USER}/auth`,
    API_GAME_URL: `${BASE_URL_GAME}/games`,
    API_CLUBS_URL: `${BASE_URL_GAME}/clubs`,
    API_PAVILIONS_URL: `${BASE_URL_GAME}/pavilions`,
};

export default config;