# NuLEAF-Source
Nuleaf website backend.

## Quickstart

Clone the repo.
```
git clone .git nuleaf-source
```

Build the docker image.
```
docker build -t nuleaf-source ./nuleaf-source
```

Start the docker container.
```
docker run -dit
           --name nuleaf-source
           -p 3000:3000
           --link mongo:mongo
           -e NULEAF_SOURCE_DB_URL=mongodb://mongo/nuleaf-source
           nuleaf-source
```