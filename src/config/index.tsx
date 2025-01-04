let HOST, BASE_URL_USER, BASE_URL_GAME, BASE_URL_PAYMENTS;

// Obter variáveis do `window.env` (definido pelo `entrypoint.sh`)
const env = window.env || {};

const scheme = {
  HTTP: "http://",
  HTTPS: "https://",
};

// Se a variável `DOMAIN` foi passada pelo ECS, usa ela
if (env.DOMAIN) {
  HOST = env.DOMAIN;
  BASE_URL_USER = `${scheme.HTTPS}${HOST}/user`;
  BASE_URL_GAME = `${scheme.HTTPS}${HOST}/games`;
  BASE_URL_PAYMENTS = `${scheme.HTTPS}${HOST}/payments`;
} else {
  // Ambiente local
  HOST = "localhost";
  BASE_URL_USER = `${scheme.HTTP}${HOST}:8000`;
  BASE_URL_GAME = `${scheme.HTTP}${HOST}:8002`;
  BASE_URL_PAYMENTS = `${scheme.HTTP}${HOST}:8003`;
}

const config = {
  PRODUCTION: env.PRODUCTION || false,
  HOST,
  VITE_LOGIN_SIGN_UP: env.VITE_LOGIN_SIGN_UP,
  BASE_URL_USER,
  API_USER_URL: `${BASE_URL_USER}/auth`,
  API_GAME_URL: `${BASE_URL_GAME}/games`,
  API_CLUBS_URL: `${BASE_URL_GAME}/clubs`,
  API_PAVILIONS_URL: `${BASE_URL_GAME}/pavilions`,
  API_PAYMENTS_URL: `${BASE_URL_PAYMENTS}`,
};

export default config;
