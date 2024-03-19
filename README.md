# Home Library Service (Docker)

### 1. Download this repository

```
git clone {repository URL} or Download ZIP
```

### 2. Create _.env_ file 
Add **environment variables** (see _.env.example_ file) or just rename _.env.example_ file to _.env_ file

### 3. Run Docker Desktop

> _***! Check the ports and running containers in Docker.***_ 
> _***!! If the port is already occupied or other containers are already using the necessary resources, you will need to free up these resources or choose different ports for your application.***_

### 4. Run Docker Container

_Open terminal and run app:_

```
npm run docker:up (or docker-compose up)
```

___OR___ _To download the images from Docker Hub and run the application, use the command:_

```
npm run docker:up:pub (or docker-compose -f docker-compose.pub.yml up)
```

> _***!!!***_ - "application is restarting upon changes implemented into src folder" - This feature doesn't work in the current mode. **Only when running the command: npm run docker:up**

-   After starting the app on port (**4000 as default**) you can open
    in your browser OpenAPI documentation by typing http://localhost:4000/doc

-   All requests are available by URL http://localhost:4000/

_Examples:_

```
get request -> http://localhost:4000/artist

response -> [
    {
        "id": "80458200-dd5d-11ee-a97d-c5cef3c97348",
        "name": "Freddie Mercury",
        "grammy": false
    }
]
------------------------------------------------------
get request -> http://localhost:4000/track

response -> [
    {
        "id": "7fbbae03-dd5c-11ee-a686-ed5a6659a3e1",
        "name": "The Show Must Go On",
        "artistId": "80458200-dd5d-11ee-a97d-c5cef3c97348",
        "albumId": "201702a0-dd5d-11ee-82b9-f35a2947a09a",
        "duration": 262
    }
]
```

#### Important
___If you want to rebuild and run container using `docker-compose up --build`, use the `npm run docker:down` command before, to clean up volumes in database.___

### 5. Run tests

**After application running open new terminal and enter:**

_To run all tests without authorization_

```
npm run test (or npm run docker:test)
```

_To run only one of all test suites_

```
npm run test -- <path to suite>
```

_To run all test with authorization_

```
npm run test:auth
```

_To run only specific test suite with authorization_

```
npm run test:auth -- <path to suite>
```

### 6. For auto-fix and format you can use:

```
npm run lint
```

```
npm run format
```
