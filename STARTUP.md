# Getting Started
## Cloning the repo
- Create a new folder
- Within the new folder
    - Clone Forge-Backend
    - Clone Porfolio-Frontend

<b>Have these projects within the same directory for the docker-compose to work.</b>

## Development
- `npm install` to install the necessary dependencies.
- `npm start` to run the React site.
    - Access the site via `http://localhost:3000`
    - The application will be unable to process request without the backend running.
- To run the backend see `Forge-Backend/STARTUP.md#Development`

## Deployment
In deployment the built React site will be served by the Springboot application. See `Forge-Backend/STARTUP.md#Deployment` for how to deploy.