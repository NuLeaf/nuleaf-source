# NuLEAF-Source
Nuleaf website backend.

## Quickstart

### Clone the repo.
```
git clone https://github.com/NuLeaf/nuleaf-source.git nuleaf-source
```

### Build the docker image.
```
docker build -t nuleaf-source ./nuleaf-source
```

### Start the docker container.
```
docker run -dit --name mongo mongo

docker run -dit
           --name nuleaf-source
           -p 3000:3000
           --link mongo:mongo
           -e NULEAF_SOURCE_DB_URL=mongodb://mongo/nuleaf_source
           nuleaf-source
```

## Installation

### Node.js
Our REST API runs on Node.js. Please go to their [website](https://nodejs.org/en/) and install the latest version.

### NPM
Node.js uses a package manager called NPM. This will be the main command line tool we will use to install dependencies and to start our application. The installation of Node.js should have included NPM.

Check that you have both installed using `node -v` and `npm -v`.

### Clone the repo.
```
git clone https://github.com/NuLeaf/nuleaf-source.git nuleaf-source
```

### Install dependencies.
```
cd nuleaf-source/nuleaf-source

npm install
```

### Setup mongoDB.
Our REST API uses mongoDB as its data storage. We need to set up a database that will be used by our app. Download mongoDB from their [website](https://www.mongodb.com/download-center#community). There are instructions located [here](https://docs.mongodb.com/manual/tutorial/)

Once installed, start a mongod process.
```
mkdir -p /data/db

mongod
```
This will start storing database data in the /data/db directory. You will also need to set the environment variable so that the application knows where your database is:

Set the variable `NULEAF_SOURCE_DB_URL` to `mongodb://localhost/nuleaf_source`

### Run the application.
```
npm start
```
