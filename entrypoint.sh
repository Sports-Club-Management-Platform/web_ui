#!/bin/sh

cat <<EOF > /usr/share/nginx/html/env-config.js
window.env = {
  DOMAIN: "${DOMAIN}",
  VITE_LOGIN_SIGN_UP: "${VITE_LOGIN_SIGN_UP}",
};
EOF