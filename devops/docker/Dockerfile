FROM node:14.17

WORKDIR /Portfolio-Frontend

COPY Dependencies.txt /Portfolio-Frontend
COPY package.json /Portfolio-Frontend
COPY package-lock.json /Portfolio-Frontend
COPY public/ /Portfolio-Frontend/public
COPY src/ /Portfolio-Frontend/src
COPY tsconfig.json /Portfolio-Frontend

RUN ["npm", "cache", "clean", "-force"]

RUN ["npm", "install"]

CMD ["npm", "start"]
