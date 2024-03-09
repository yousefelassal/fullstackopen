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

force stop container
```bash
docker kill CONTAINER-ID-OR-CONTAINER-NAME
```

- installing [nodesource](https://github.com/nodesource/distributions)

create a new image from the container. The command
```bash
docker commit CONTAINER-ID-OR-CONTAINER-NAME NEW-IMAGE-NAME
```
