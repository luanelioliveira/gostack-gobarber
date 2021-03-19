# Gostack Gobarber API

create and run database
```bash
docker run -p 5432:5432 -d --network=host --name gobarber-db -e POSTGRES_DB=gostack_gobarber -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres:latest
```

run database
```bash
docker run gobarber-db
```

run database migrations
```bash
yarn typeorm migration:run
```

run application
```bash
yarn dev:server
```
