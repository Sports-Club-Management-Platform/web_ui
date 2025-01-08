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

# Etapa 2: Produção
FROM nginx:stable-alpine

# Remover o arquivo de configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos estáticos gerados pelo build para o Nginx
COPY --from=build /web_ui/dist /usr/share/nginx/html

# Copiar o arquivo de configuração customizado do Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Configurar o comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]