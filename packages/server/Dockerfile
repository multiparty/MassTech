# **************1. install with all dependencies **************
FROM node:16-alpine3.17 as builder
WORKDIR /app 
COPY . .
RUN npm install
RUN npm run build


# **************2. install without dev dependencies **************
FROM node:16-alpine3.17 as production
WORKDIR /app
COPY . .

# Copy over the build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev
CMD ["node", "dist/main"]