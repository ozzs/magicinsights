<p align="center">
  <img src="https://github.com/ozzs/magicinsights/blob/main/frontend/public/logo-blue.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/ozzs/magicinsights/blob/main/showcase.mov"  height="400" />
</p>
<br />

<p align="center">
  <img alt="react" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img alt="typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="tailwind" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="fastify" src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" />
  <img alt="postgres" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
</p>
<br />

## Usage

To start, run the following commands:

### For Postgres

```
docker-compose up
```

### For the backend and database migrations

```
cd server && npm run dev
npm run generate-dummy-data
```

### For the frontend

```
cd frontend && npm run dev
```

### To delete the postgres database and its data

```
docker-compose down -v
```

## Limitations

- No support for creating charts on a nested JSON property - only top level
- Charts - input validation is not 100% in REST API
- Error handling in UI/Admin - not 100% - doesn't always show errors
