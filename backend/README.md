# Fastify CRUD API Project

A simple CRUD API built using Fastify, PostgreSQL, and Kyseley.

## Getting Started

### Clone the Repository

- `git clone https://github.com/jandranrebbalangue/symply-fullstack-assessment.git`
- `cd symply-fullstack-assessment`

### Install Dependencies

- `yarn install`

### Set up PostgreSQL

1. Start a database: `yarn start:db`
2. After creating a new database, you can set up pgAdmin by accessing http://localhost:5050.

## Usage

Start the Fastify server in development mode:

- `yarn dev`

## API Endpoints

- Create Record: POST /tasks
- Read Records:
  - All: GET /tasks
  - Single: GET /tasks/:id
- Update Record: PUT /tasks/:id
- Delete Record: DELETE /tasks/:id
