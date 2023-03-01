# Using Node 10 Alpine image as the builder
FROM node:14-alpine as builder
ARG BASE_HREF
ARG ENV_CONFIG
ARG DIST_FOLDER=dist

# Setting Env Var Production as true
ENV PRODUCTION true
#COPY vendor ./vendor

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
RUN if [ "$DIST_FOLDER" = "instrumented" ] ; then \
npm run build:dev -- --configuration instrument --base-href ${BASE_HREF} && \
npm run instrument ; \
else \
npm run build -- --configuration ${ENV_CONFIG} --base-href ${BASE_HREF} ; \
fi

# compress dist folder
RUN if [ "$DIST_FOLDER" = "instrumented" ] ; then \
npm run compress:instrument ; \
else \
npm run compress ; \
fi

# Using NGINX as the web server image
FROM sourcefuse/nginx:release-1.0.5

ARG DIST_FOLDER=dist

# Replacing the defaut config of NGINX
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Removing unwanted files from the base NGINX folder
RUN rm -rf /usr/share/nginx/html/*

# Copying build files from the builder to the app's root dir
COPY --from=builder /ng-app/${DIST_FOLDER}/rakuten-pms-ui /usr/share/nginx/html

# Copying the startup script
COPY docker/startup.sh /startup.sh

# Enabling executable rights on the script
RUN chmod +x startup.sh

# Running the startup script
CMD ["/bin/sh","-c","./startup.sh"]