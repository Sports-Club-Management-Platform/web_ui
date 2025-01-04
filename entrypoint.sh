#!/bin/sh

# Criar o arquivo .env dentro do diretório onde o frontend espera encontrar
echo "VITE_LOGIN_SIGN_UP=$VITE_LOGIN_SIGN_UP" > /usr/share/nginx/html/.env
echo "VITE_DOMAIN=$VITE_DOMAIN" >> /usr/share/nginx/html/.env

# Iniciar o Nginx
exec "$@"