# Windows Explorer Web App

## Overview

The **Windows Explorer Web App** is a web-based application designed to replicate the functionality of a file explorer in a browser environment. This project is built with modern technologies such as **Bun**, **Prisma**, **Elysia**, and **Docker**.

## Features

- Lightweight and fast execution with Bun.
- Database integration using Prisma and PostgreSQL.
- Swagger documentation for API endpoints.
- Enhanced logging with Winston.
- Input validation using Zod.
- CORS and error handling with Elysia middleware.

## Installation

### Prerequisites

- [Bun](https://bun.sh/) installed on your system.
- [Docker](https://www.docker.com/) installed and running.
- A `.env` file with the required environment variables for the database setup.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/rizkiwhy/windows-explorer-web-service.git
   cd windows-explorer-web-app
   ```
2. Install dependencies:
   ```bash
   bun install
   ```

## Scripts

The project includes several scripts to streamline development and deployment:

| Script       | Command                                                         | Description                       |
| ------------ | --------------------------------------------------------------- | --------------------------------- |
| `test`       | `bun run test`                                                  | Placeholder for running tests.    |
| `dev`        | `bun run --watch src/index.ts`                                  | Starts the development server.    |
| `db:up`      | `docker-compose --env-file .env -f db/docker-compose.yml up -d` | Starts the database using Docker. |
| `db:down`    | `docker-compose --env-file .env -f db/docker-compose.yml down`  | Stops and removes the database.   |
| `db:migrate` | `bunx prisma migrate dev`                                       | Applies database migrations.      |
| `lint`       | `eslint . --fix`                                                | Lints and fixes code issues.      |
| `format`     | `prettier --write .`                                            | Formats the codebase.             |

## Usage

1. Start the database:
   ```bash
   bun run db:up
   ```
2. Apply database migrations:
   ```bash
   bun run db:migrate
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```

## Technologies Used

- **Bun**: Fast JavaScript runtime.
- **Prisma**: ORM for managing database schema and queries.
- **PostgreSQL**: Database backend.
- **Elysia**: Lightweight web framework.
- **Winston**: Logging library.
- **Zod**: Schema validation library.

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Bun](https://bun.sh/)
- [Prisma](https://www.prisma.io/)
- [Elysia](https://elysiajs.com/)
