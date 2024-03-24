### a Introduction to Containers

A _container_ is a runtime instance of an _image_.

Both of the following statements are true:

- Images include all of the code, dependencies and instructions on how to run the application
- Containers package software into standardized units

Cooking metaphor:

- Image is pre-cooked, frozen treat.
- Container is the delicious treat.

to tell Docker to create a container from an image. 
```
container run IMAGE-NAME
```

An image name is in the following format: `registry/organisation/image:tag`


The two options, or flags, `-it` make sure we can interact with the container. After the options, we defined that image to run is `ubuntu`. Then we have the command `bash` to be executed inside the container when we start it.
```bash
docker container run -it ubuntu bash
```

list all _(`-a`)_ containers
```bash
docker container ls -a
CONTAINER ID   IMAGE     COMMAND   CREATED          STATUS                            NAMES
b8548b9faec3   ubuntu    "bash"    3 minutes ago    Exited (0) 6 seconds ago          hopeful_clarkecopy
```
> `docker container ls` has also a shorter form `docker ps`

---

start a container
```bash
docker start -i hopeful_clarkecopy
```
`-i` will start the container in interactive mode

---

force stop container
```bash
docker kill CONTAINER-ID-OR-CONTAINER-NAME
```

- installing [nodesource](https://github.com/nodesource/distributions)

create a new image from the container.
  ```bash
  docker commit CONTAINER-ID-OR-CONTAINER-NAME NEW-IMAGE-NAME
  ```

---

`container run` accepts `--name` flag that we can use to give a name for the container.
  ```bash
  $ docker container run -it --name hello-node node:21 bash
  ```
  will create a new node image

---

`container cp` command to copy file from your own machine to the container.
```bash
$ docker container cp ./index.js hello-node:/usr/src/app/index.js
```

### b Building and configuring environments

#### Dockerfile
Dockerfile is a simple text file that contains all of the instructions for creating an image.

```Dockerfile
FROM node:21

WORKDIR /usr/src/app

COPY ./index.js ./index.js

CMD node index.js
```
- `FROM` instruction will tell Docker that the base for the image should be `node:21`.
- `COPY` instruction will copy the file _index.js_ from the host machine to the file with the same name in the image.
- `CMD` instruction tells what happens when `docker run` is used.
- `WORKDIR` ensures we don't interfere with the contents of the image. It will guarantee all of the following commands will have _/usr/src/app_ set as the working directory. If the directory doesn't exist in the base image, it will be automatically created.

---

`docker build` to build an image based on the Dockerfile. flag: `-t`, this will help us name the image:
```bash
$ docker build -t fs-hello-world . 
[+] Building 3.9s (8/8) FINISHED
```

---

```bash
docker run -p 3123:3000 express-server
```
The `-p` flag will inform Docker that a port from the host machine should be opened and directed to a port in the container. The format for is `-p host-port:application-port`.

---

#### Differences between `npm ci` and `npm install`:

- `install` may update the _package-lock.json_.
- `install` may install a different version of a dependency if you have `^` or `~` in the version of the dependency.
- `ci` will delete the _node_modules_ folder before installing anything.
- `ci` will follow the _package-lock.json_ and does not alter any files.

we can use `npm ci --omit=dev` to not waste time installing development dependencies.

- [best practices for Node/Express containerization](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/) 

---

#### [Docker compose](https://docs.docker.com/compose/)
```yml
version: '3.8'            # Version 3.8 is quite new and should work

services:
  app:                    # The name of the service, can be anything
    image: express-server # Declares which image to use
    build: .              # Declares where to build if image is not found
    ports:                # Declares the ports to publish
      - 3000:3000
```

- build and run the application `docker compose up`.
- if we want to rebuild the images `docker compose up --build` .
- run the application in the background with docker compose up `-d (-d for detached)`
- close it with `docker compose down`.

---

#### [MongoDB Image](https://hub.docker.com/_/mongo)

```yml
version: '3.8'

services:
  mongo:
    image: mongo
    ports:
      - 3456:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: the_database
```

> These variables, used in conjunction, create a new user and set that user's password. This user is created in the admin authentication database and given the role of root, which is a "superuser" role.

The last environment variable `MONGO_INITDB_DATABASE` will tell MongoDB to create a database with that name.

---

`-f` flag will specify a _file_ to run the Docker Compose command with e.g.
```bash
docker compose -f docker-compose.dev.yml up
```

`-d` flag will run it in the background.
```bash
docker compose -f docker-compose.dev.yml up -d
```

`-f` will ensure we follow the output logs.
```bash
docker compose -f docker-compose.dev.yml logs -f
```

---

#### [Bind mounts](https://docs.docker.com/storage/bind-mounts/)

Bind mount is the act of binding a file (or directory) on the host machine to a file (or directory) in the container. A bind mount is done by adding a `-v` flag with container run. The syntax is `-v FILE-IN-HOST:FILE-IN-CONTAINER`

```yml
  mongo:
    image: mongo
    ports:
     - 3456:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: the_database
    volumes: 
      - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
```

The result of the bind mount is that the file _mongo-init.js_ in the mongo folder of the host machine is the same as the _mongo-init.js_ file in the container's _/docker-entrypoint-initdb.d_ directory. **Changes to either file will be available in the other**. We don't need to make any changes during runtime. But this will be the key to software development in containers.

---

#### [Volumes](https://docs.docker.com/storage/volumes/)

![qou9xu7r](https://github.com/yousefelassal/fullstackopen/assets/76617202/e0a142a4-0651-465c-84d1-d6d218816eaa)

Volumes are the preferred mechanism for persisting data generated by and used by Docker containers. While [bind mounts](https://docs.docker.com/storage/bind-mounts/) are dependent on the directory structure and OS of the host machine, volumes are completely managed by Docker.

```yml
services:
  mongo:
    image: mongo
    ports:
     - 3456:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: the_database
    volumes:
      - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
      - mongo_data:/data/db


volumes:
  mongo_data:
```

The above will create a directory called _mongo_data_ to your local filesystem and map it into the container as _/data/db_. This means the data in _/data/db_ is stored outside of the container but still accessible by the container!


list the volumes with docker `volume ls`, inspect one of them with `docker volume inspect` and even delete them with `docker volume rm`:

```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     todo-backend_mongo_data
$ docker volume inspect todo-backend_mongo_data
[
    {
        "CreatedAt": "2022-10-04T12:52:11Z",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "todo-backend",
            "com.docker.compose.version": "1.29.2",
            "com.docker.compose.volume": "mongo_data"
        },
        "Mountpoint": "/var/lib/docker/volumes/todo-backend_mongo_data/_data",
        "Name": "todo-backend_mongo_data",
        "Options": null,
        "Scope": "local"
    }
]
```

---

#### [`docker exec`](https://docs.docker.com/reference/cli/docker/container/exec/) | Docker Docs
It can be used to jump right into a container when it's running.

```bash
$ docker container ls
CONTAINER ID   IMAGE     COMMAND  PORTS                  NAMES
7edcb36aff08   nginx     ...      0.0.0.0:8080->80/tcp   wonderful_ramanujan

$ docker exec -it wonderful_ramanujan bash
root@7edcb36aff08:/#
```

---

#### [Nginx](https://www.nginx.com/)
create container in dispatch mode and expose port 8080
```bash
docker container run -d -p 8080:80 nginx
```

exec inside the running container and open bash, the html is serverd inside `/usr/share/nginx/html/`
```bash
root@7edcb36aff08:/ cd /usr/share/nginx/html/
```

---

#### [Redis](https://redis.io/docs/get-started/data-store/) | Redis Docs
##### [Redis Image](https://hub.docker.com/_/redis) | Redis Docker Hub
```yml
services:
  redis:
    image: redis
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - ./redis_data:/data
```

#### Connecting 
```js
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
```

#### Store and retrieve data
Redis stands for Remote Dictionary Server. You can use the same data types as in your local programming environment but on the server side within Redis.


```js
await client.set('bike:1', 'Process 134');
const value = await client.get('bike:1');
console.log(value);
// returns 'Process 134'
```

Hashes:

```js
const fieldsAdded = await client.hSet(
    'bike:1',
    {
        model: 'Deimos',
        brand: 'Ergonom',
        type: 'Enduro bikes',
        price: 4972,
    },
)
console.log(`Number of fields were added: ${fieldsAdded}`);
// Number of fields were added: 4

const model = await client.hGet('bike:1', 'model');
console.log(`Model: ${model}`);
// Model: Deimos

const price = await client.hGet('bike:1', 'price');
console.log(`Price: ${price}`);
// Price: 4972

const bike = await client.hGetAll('bike:1');
console.log(bike);
// {
//   model: 'Deimos',
//   brand: 'Ergonom',
//   type: 'Enduro bikes',
//   price: '4972'
// }
```

---

#### [`redis-cli`](https://redis.io/docs/connect/cli/) | Redis Docs
access it with docker
```bash
docker exec -it CONTAINER-NAME bash

root@aykalam0777:/data# redis-cli
```

##### [`KEYS`](https://redis.io/commands/keys/)
```redis
redis> MSET firstname Jack lastname Stuntman age 35
"OK"
redis> KEYS *name*
1) "lastname"
2) "firstname"
redis> KEYS a??
1) "age"
redis> KEYS *
1) "age"
2) "lastname"
3) "firstname"
```

##### [`GET`](https://redis.io/commands/get/)
```redis
redis> GET nonexisting
(nil)
redis> SET mykey "Hello"
"OK"
redis> GET mykey
"Hello"
```
