#!/bin/sh

# Substituir variáveis no runtime dentro do `index.html`
envsubst < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp
mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html

# Iniciar o Nginx
exec "$@"