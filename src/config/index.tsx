let HOST: string;
let BASE_URL_USER: string;

export const loadEnvVariables = async (): Promise<Record<string, string>> => {
  try {
    const response = await fetch("/.env");
    const text = await response.text();

    // Converter o conteúdo do .env em um objeto JS
    const envVars = text.split("\n").reduce((acc, line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    console.log("Variáveis de ambiente carregadas:", envVars);
    return envVars;
  } catch (error) {
    console.error("Erro ao carregar variáveis de ambiente:", error);
    return {};
  }
};

// 🔥 Agora `initializeConfig` retorna uma `Promise`, garantindo que as variáveis sejam carregadas antes de serem usadas
export const initializeConfig = async (): Promise<{
  PRODUCTION: boolean;
  HOST: string;
  VITE_LOGIN_SIGN_UP: string;
  BASE_URL_USER: string;
  API_USER_URL: string;
  API_GAME_URL: string;
  API_CLUBS_URL: string;
  API_PAVILIONS_URL: string;
  API_PAYMENTS_URL: string;
}> => {
  const envVars = await loadEnvVariables();

  HOST = "localhost"; // Definição inicial do HOST
  BASE_URL_USER = `${HOST}:8000`;

  return {
    PRODUCTION: import.meta.env.PROD || false,
    HOST,
    VITE_LOGIN_SIGN_UP: envVars.VITE_LOGIN_SIGN_UP || "",
    BASE_URL_USER,
    API_USER_URL: `${BASE_URL_USER}/auth`,
    API_GAME_URL: `${BASE_URL_USER}/games`,
    API_CLUBS_URL: `${BASE_URL_USER}/clubs`,
    API_PAVILIONS_URL: `${BASE_URL_USER}/pavilions`,
    API_PAYMENTS_URL: `${BASE_URL_USER}`,
  };
};

const config = await initializeConfig();

export default config;
