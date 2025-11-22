FROM mcr.microsoft.com/playwright:v1.56.1-noble

WORKDIR /playwright-tests

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "playwright", "test", "--project=firefox"]