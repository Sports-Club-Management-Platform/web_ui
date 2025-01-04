# Etapa 1: Build
FROM node:lts AS build

WORKDIR /web_ui

# Copiar apenas os arquivos necessários para instalar as dependências e buildar
COPY package.json yarn.lock ./

# Instalar as dependências
RUN yarn install --silent

# Copiar o restante do código e buildar
COPY . .
RUN yarn build

# Etapa 2: Produção
FROM nginx:stable-alpine

# Remover o arquivo de configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos estáticos gerados pelo build para o Nginx
COPY --from=build /web_ui/dist /usr/share/nginx/html

# Criar um script de inicialização para injetar variáveis de ambiente no runtime
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expor a porta padrão do Nginx
EXPOSE 80

# Configurar o comando padrão para iniciar o Nginx com substituição dinâmica das variáveis
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]