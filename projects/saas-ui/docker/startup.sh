# Startup script to run when deploying the container
echo "Starting startup.sh script"
envsubst < "/usr/share/nginx/html/assets/json/environment-template.json" > "/usr/share/nginx/html/assets/json/environment.json"
nginx -g 'daemon off;'