# symply-fullstack-assesment

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/jandranrebbalangue/symply-fullstack-assessment.git
cd symply-fullstack-assessment
```
### Install Dependencies

1. First, install dependencies in the root directory:
```bash
yarn install
```
2. To install all dependencies for both the app and backend, simply run:
```bash
yarn install:packages
```
### Set up PostgreSQL

1. Navigate to the backend directory:

```bash
cd backend
```
2. Start the PostgreSQL database: 

```bash
yarn start:db
```
3. After starting the database, you can set up pgAdmin by accessing http://localhost:5050

4. Copy the env.example file and rename it to .env:
```bash
cp env.example .env
```
5. Edit the .env file and set the following values:

ps: you can use this value to make a database in pgAdmin

DATABASE_URL="postgres://postgres:root@postgres:5432/postgres"

POSTGRES_USER="postgres"

POSTGRES_HOST="localhost"

POSTGRES_PASSWORD="root"

POSTGRES_DB="postgres"

POSTGRES_PORT=5432

### Setup .env inside app
1. Copy the env.example file in the app directory and rename it to .env:
```bash
cp env.example .env
```
2. Edit the .env file and set the following value:
VITE_API_ENDPOINT="http://localhost:3000"

### Usage
To start the Fastify server in development mode and React just run:
```bash
yarn dev
```
To build the project for both the app and backend, execute the following command:
```bash
yarn build:packages
```
