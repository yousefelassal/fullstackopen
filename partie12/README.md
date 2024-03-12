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
