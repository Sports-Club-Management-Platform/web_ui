let HOST, BASE_URL_USER, BASE_URL_GAME, BASE_URL_PAYMENTS, BASE_URL_TICKET;

const scheme = {
  HTTP: "http://",
  HTTPS: "https://",
};

if (import.meta.env.VITE_PROD) {
  HOST = import.meta.env.VITE_DOMAIN;
  BASE_URL_USER = `${scheme.HTTPS}${HOST}/users/v1`;
  BASE_URL_TICKET = `${scheme.HTTPS}${HOST}/tickets/v1`;
  BASE_URL_GAME = `${scheme.HTTPS}${HOST}/games/v1`;
  BASE_URL_PAYMENTS = `${scheme.HTTPS}${HOST}/payments/v1`;
} else {
  HOST = "localhost";
  BASE_URL_USER = `${scheme.HTTP}${HOST}:8000`;
  BASE_URL_TICKET = `${scheme.HTTP}${HOST}:8001`;
  BASE_URL_GAME = `${scheme.HTTP}${HOST}:8002`;
  BASE_URL_PAYMENTS = `${scheme.HTTP}${HOST}:8003`;
}

const config = {
  PRODUCTION: import.meta.env.PROD,
  HOST,
  BASE_URL_USER,
  API_USER_URL: `${BASE_URL_USER}/auth`,
  API_GAME_URL: `${BASE_URL_GAME}/games`,
  API_CLUBS_URL: `${BASE_URL_GAME}/clubs`,
  API_PAVILIONS_URL: `${BASE_URL_GAME}/pavilions`,
  API_TICKETS_URL: `${BASE_URL_TICKET}/tickets`,
  API_PAYMENTS_URL: `${BASE_URL_PAYMENTS}`,
};

export default config;
