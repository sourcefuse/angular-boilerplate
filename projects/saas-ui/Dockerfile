# Using Node 10 Alpine image as the builder
FROM node:18-alpine as builder
ARG BASE_HREF
ARG CLIENT_ID
ARG
#ARG ENV_CONFIG
# Setting Env Var Production as true
ENV PRODUCTION true

RUN ls -la
# Creating a new dir for the app
RUN mkdir /ng-app
# Copying package.json (done to implement docker caching and speed up build)
COPY package.json package-lock.json ./ng-app/
# Setting current working dir
WORKDIR /ng-app
# Setting npm config and cleaning cache
# RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
# Installing node dependencies
RUN npm install
# Copying all files into the working dir
COPY . .

# Creating a build version of the app for deployment
#RUN npm run build -- --configuration production
RUN npm run build saas-ui
# Using NGINX as the web server image
FROM sourcefuse/nginx:release-1.2.0
# Replacing the defaut config of NGINX
COPY --chown=node projects/saas-ui/nginx/default.conf /etc/nginx/conf.d/default.conf
# Removing unwanted files from the base NGINX folder
RUN rm -rf /usr/share/nginx/html/*
# Copying build files from the builder to the app's root dir
COPY --chown=node --from=builder /ng-app/dist/saas-ui /usr/share/nginx/html
# Copying the startup script
COPY --chown=node projects/saas-ui/docker/startup.sh /startup.sh
# Enabling executable rights on the script
RUN chmod +x startup.sh
# Running the startup script
CMD ["/bin/sh","-c","./startup.sh"]