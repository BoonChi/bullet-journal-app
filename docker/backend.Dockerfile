FROM node:12
WORKDIR /code
CMD ["npx", "nodemon", "app.js"]
