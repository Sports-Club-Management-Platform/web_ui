# ==============================
# Etapa 1: Build do Frontend
# ==============================
FROM node:lts AS build

WORKDIR /web_ui

# Copiar apenas arquivos necessários para instalar dependências
COPY package.json yarn.lock ./

# Instalar as dependências
RUN yarn install --silent

# Copiar o restante do código e buildar
COPY . .
RUN yarn build

# ==============================
# Etapa 2: Produção com Nginx
# ==============================
FROM nginx:stable-alpine

# Definir diretório de trabalho
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do Nginx
RUN rm -rf ./*

# Copiar os arquivos do build para o Nginx
COPY --from=build /web_ui/dist .

# Copiar o script de entrada que criará `env-config.js` dinamicamente
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copiar a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Definir o script de entrada antes de iniciar o Nginx
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]