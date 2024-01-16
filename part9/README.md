### a Background and introduction


![1](https://github.com/yousefelassal/fullstackopen/assets/76617202/a0718f00-451a-4f7d-a1a7-99bc516b61db)

#### TypeScript key language features
- Type annotations

   a lightweight way to record the intended _contract_ of a function or a variable. In the example below, we have defined a `birthdayGreeter` function that accepts two arguments: one of type string and one of type number. The function will return a string.
  ```ts
  const birthdayGreeter = (name: string, age: number): string => {
    return `Happy birthday ${name}, you are now ${age} years old!`;
  };
  
  const birthdayHero = "Jane User";
  const age = 22;
  
  console.log(birthdayGreeter(birthdayHero, age));
  ```

- Structural typing
  
   TypeScript is a structurally-typed language. A structural type system means that when comparing types, TypeScript only takes into account the members on the type.

  ```ts
  // For example, these two interfaces are completely
  // transferrable in a structural type system:
   
  interface Ball {
    diameter: number;
  }
  interface Sphere {
    diameter: number;
  }
   
  let ball: Ball = { diameter: 10 };
  let sphere: Sphere = { diameter: 20 };
   
  sphere = ball;
  ball = sphere;
  ```

- Type inference

  The TypeScript compiler can attempt to infer the type information if no type has been specified. Variables' type can be inferred based on their assigned value and their usage. The type inference takes place when initializing variables and members, setting parameter default values, and determining function return types.
   
   For example, consider the function `add`:
   ```ts
   const add = (a: number, b: number) => {
     /* The return value is used to determine
        the return type of the function */
     return a + b;
   }
   ```
   The type of the function's return value is inferred by retracing the code back to the return expression. The return expression performs an addition of the parameters a and b. We can see that a and b are numbers based on their types. Thus, we can infer the return value to be of type `number`.


### b First steps with TypeScript

- [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) | TypeScript Docs

  specifies the root files and the compiler options required to compile the project.

  Example tsconfig.json using the [include](https://www.typescriptlang.org/tsconfig#include) and [exclude](https://www.typescriptlang.org/tsconfig#exclude) properties:
   ```json
   {
     "compilerOptions": {
       "module": "system",
       "noImplicitAny": true,
       "removeComments": true,
       "preserveConstEnums": true,
       "outFile": "../../built/local/tsc.js",
       "sourceMap": true
     },
     "include": ["src/**/*"],
     "exclude": ["**/*.spec.ts"]
   }
   ```

- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) | TypeScript Docs

   a type formed from two or more other types, representing values that may be _any one_ of those types. We refer to each of these types as the union’s _members_.

   Let’s write a function that can operate on strings or numbers:
   ```ts
   function printId(id: number | string) {
     console.log("Your ID is: " + id);
   }
   // OK
   printId(101);
   // OK
   printId("202");
   // Error
   printId({ myID: 22342 });
   ```
