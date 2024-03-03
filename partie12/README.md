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

