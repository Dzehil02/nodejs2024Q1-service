# Home Library Service

### 1. Download this repository

```
git clone {repository URL}
```

### 2. Install NPM modules

```
npm install
```

### 3. Create *.env* file and add **PORT=4000** (see *.env.example* file) or just rename *.env.example* file to *.env* file

### 4. Run application

```
npm start (or npm run start:dev)
```

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

### 5. Run tests

**After application running open new terminal and enter:**

_To run all tests without authorization_

```
npm run test
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
