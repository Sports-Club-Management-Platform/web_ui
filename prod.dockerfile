# Usa uma imagem base adequada
FROM node:18-alpine AS build

# Define argumentos de build para variáveis de ambiente
ARG VITE_DOMAIN
ARG VITE_LOGIN_SIGN_UP

# Define variáveis de ambiente dentro do contêiner
ENV VITE_DOMAIN=$VITE_DOMAIN
ENV VITE_LOGIN_SIGN_UP=$VITE_LOGIN_SIGN_UP

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copia o código-fonte
COPY . .

# Gera a build
RUN npm run build

# Usa uma imagem leve para servir a aplicação
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]