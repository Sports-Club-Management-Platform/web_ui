# Etapa 1: Build
FROM node:lts AS build

WORKDIR /web_ui

# Copiar apenas os arquivos necessários para instalar as dependências e buildar
COPY package.json yarn.lock ./

# Instalar as dependências
RUN yarn install --silent

# Definir variáveis de ambiente durante o build
ARG VITE_LOGIN_SIGN_UP
ENV VITE_LOGIN_SIGN_UP=${VITE_LOGIN_SIGN_UP}
ARG VITE_DOMAIN
ENV VITE_DOMAIN=${VITE_DOMAIN}
ENV VITE_PROD=true

# Copiar o restante do código e buildar
COPY . .
RUN yarn build

# Etapa 2: Produção (Sem Nginx, usando serve)
FROM node:lts-alpine

WORKDIR /web_ui

# Instalar um servidor estático simples
RUN npm install -g serve

# Copiar os arquivos do build
COPY --from=build /web_ui/dist /web_ui

# Expor a porta padrão do servidor
EXPOSE 8080

# Comando para iniciar o servidor estático
CMD ["serve", "-s", "/web_ui", "-l", "8080"]