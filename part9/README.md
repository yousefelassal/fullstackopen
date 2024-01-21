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
- [Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces) | TypeScript Docs
   
   An _interface declaration_ is a way to name an object type:
   
   ```ts twoslash
   interface Point {
     x: number;
     y: number;
   }
   
   function printCoord(pt: Point) {
     console.log("The coordinate's x value is " + pt.x);
     console.log("The coordinate's y value is " + pt.y);
   }
   
   printCoord({ x: 100, y: 100 });
   ```
   
   #### Differences Between Type Aliases and Interfaces
   
   Type aliases and interfaces are very similar, and in many cases you can choose between them freely.
   Almost all features of an `interface` are available in `type`, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
   
   <div class='table-container'>
   <table class='full-width-table'>
     <tbody>
       <tr>
         <th><code>Interface</code></th>
         <th><code>Type</code></th>
       </tr>
       <tr>
         <td>
           <p>Extending an interface</p>
           <code><pre>
   interface Animal {
     name: string;
   }<br/>
   interface Bear extends Animal {
     honey: boolean;
   }<br/>
   const bear = getBear();
   bear.name;
   bear.honey;
           </pre></code>
         </td>
         <td>
           <p>Extending a type via intersections</p>
           <code><pre>
   type Animal = {
     name: string;
   }<br/>
   type Bear = Animal & { 
     honey: boolean;
   }<br/>
   const bear = getBear();
   bear.name;
   bear.honey;
           </pre></code>
         </td>
       </tr>
       <tr>
         <td>
           <p>Adding new fields to an existing interface</p>
           <code><pre>
   interface Window {
     title: string;
   }<br/>
   interface Window {
     ts: TypeScriptAPI;
   }<br/>
   const src = 'const a = "Hello World"';
   window.ts.transpileModule(src, {});
           </pre></code>
         </td>
         <td>
           <p>A type cannot be changed after being created</p>
           <code><pre>
   type Window = {
     title: string;
   }<br/>
   type Window = {
     ts: TypeScriptAPI;
   }<br/>
   <span style="color: #A31515"> // Error: Duplicate identifier 'Window'.</span><br/>
           </pre></code>
         </td>
       </tr>
       </tbody>
   </table>
   </div>

- [`array-simple`](https://typescript-eslint.io/rules/array-type/#array-simple) | TypeScript Eslint Docs

  Use `T[]` or `readonly T[]` for simple types (i.e. types which are just primitive names or type references). Use `Array<T>` or `ReadonlyArray<T>` for all other types (union types, intersection types, object types, function types, etc).

  ```ts
  const a: Array<string | number> = ['a', 'b'];
  const b: Array<{ prop: string }> = [{ prop: 'a' }];
  const c: Array<() => void> = [() => {}];
  const d: MyType[] = ['a', 'b'];
  const e: string[] = ['a', 'b'];
  const f: readonly string[] = ['a', 'b'];
  ```

### c Typing an Express app

#### Setup

_tsconfig.json_
```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```
- `target` configuration tells the compiler which `ECMAScript` version to use.
- `outDir` tells where the compiled code should be placed.
- `module` tells the compiler that we want to use `CommonJS` modules in the compiled code.
- `strict` is a shorthand for multiple separate options: `noImplicitAny`, `noImplicitThis`, `alwaysStrict`, `strictBindCallApply`, `strictNullChecks`, `strictFunctionTypes` and `strictPropertyInitialization`.
- `noUnusedLocals` prevents having unused local variables.
- `noUnusedParameters` throws an error if a function has unused parameters.
- `noImplicitReturns` checks all code paths in a function to ensure they return a value.
- `noFallthroughCasesInSwitch` ensures that, in a `switch case`, each case ends either with a `return` or a `break` statement.
- `esModuleInterop` allows interoperability between CommonJS and ES Modules.

_.eslintrc_
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

- [Optional Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) | TypeScript Docs
  
   Much of the time, we’ll find ourselves dealing with objects that _might_ have a property set. In those cases, we can mark those properties as _optional_ by adding a question mark (`?`) to the end of their names.
   ```ts
   interface PaintOptions {
     shape: Shape;
     xPos?: number;
     yPos?: number;
   }
   ```

- [`Pick<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) | TypeScript Docs
   
   Constructs a type by picking the set of properties `Keys` (string literal or union of string literals) from `Type`.
   
   ```ts
   interface Todo {
     title: string;
     description: string;
     completed: boolean;
   }
    
   type TodoPreview = Pick<Todo, "title" | "completed">;
    
   const todo: TodoPreview = {
     title: "Clean room",
     completed: false,
   };
   ```
- [`Omit<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) | TypeScript Docs
   
   Constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals). The opposite of `Pick`.
   
   ```ts
   interface Todo {
     title: string;
     description: string;
     completed: boolean;
     createdAt: number;
   }
    
   type TodoPreview = Omit<Todo, "description">;
    
   const todo: TodoPreview = {
     title: "Clean room",
     completed: false,
     createdAt: 1615544252770,
   };
   ```

- [`unkown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) | TypeScript Docs

  The `unknown` type represents _any_ value. This is similar to the `any` type, but is safer because it’s not legal to do anything with an `unknown` value:
   ```ts
   function f1(a: any) {
     a.b(); // OK
   }
   function f2(a: unknown) {
     a.b();
     // 'a' is of type 'unknown'.
   }
   ```

- [Type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) | TypeScript Docs

  To define a user-defined type guard, we simply need to define a function whose return type is a type predicate:
   ```ts
   function isFish(pet: Fish | Bird): pet is Fish {
     return (pet as Fish).swim !== undefined;
   }
   ```
   `pet is Fish` is our type predicate in this example. A predicate takes the form `parameterName is Type`, where `parameterName` must be the name of a parameter from the current function signature.
   
   Any time `isFish` is called with some variable, TypeScript will _narrow_ that variable to that specific type if the original type is compatible.
   ```ts
   // Both calls to 'swim' and 'fly' are now okay.
   let pet = getSmallPet();
    
   if (isFish(pet)) {
     pet.swim();
   } else {
     pet.fly();
   }
   ```

- [Enums](https://www.typescriptlang.org/docs/handbook/enums.html) | TypeScript Docs

  allow a developer to define a set of named constants, makes it easier to document intent, or create a set of distinct cases.

  #### Numeric enums
   ```ts
   enum Direction {
     Up = 1,
     Down,
     Left,
     Right,
   }
   ```
   Above, we have a numeric enum where `Up` is initialized with `1`. All of the following members are auto-incremented from that point on. In other words, `Direction.Up` has the value `1`, `Down` has `2`, `Left` has `3`, and `Right` has `4`.
   
   If we wanted, we could leave off the initializers entirely:
   ```ts
   enum Direction {
     Up,
     Down,
     Left,
     Right,
   }
   ```
   Here, `Up` would have the value `0`, `Down` would have `1`, etc. This auto-incrementing behavior is useful for cases where we might not care about the member values themselves, but do care that each value is distinct from other values in the same enum.

  Using an enum is simple: just access any member as a property off of the enum itself, and declare types using the name of the enum:
   ```ts
   enum UserResponse {
     No = 0,
     Yes = 1,
   }
    
   function respond(recipient: string, message: UserResponse): void {
     // ...
   }
    
   respond("Princess Caroline", UserResponse.Yes);
   ```

   #### String enums
   In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.
   ```ts
   enum Direction {
     Up = "UP",
     Down = "DOWN",
     Left = "LEFT",
     Right = "RIGHT",
   }
   ```

## Type Narrowing (& Parsing)

**Type predicates**
```ts
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
```

**Parsing value**
```ts
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
```

**Handling enums**
```ts
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender:unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)){
        throw Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
```

**util function**
```ts
const toNewEntry = (object: unknown): Entry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ( 'name' in object && 'gender' in object) {
        const newEntry: PatientEntry = {
            name: parseName(object.name),
            gender: parseGender(object.gender)
        };

        return newEntry;
    }

    throw new Error('Incorrect or missing data');

};
```

### d React with types

- [Non-null assertion (`!`)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-) | TypeScript Docs

  TypeScript has a special syntax for removing `null` and `undefined` from a type without doing any explicit checking. Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`:
  ```ts
  function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
  }
  ```
- [Extending Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types) | TypeScript Docs

   It’s pretty common to have types that might be more specific versions of other types.
   ```ts
   interface BasicAddress {
     name?: string;
     country: string;
   }

   interface AddressWithCity extends BasicAddress {
     city: string;
   }    
   ```

   `interface`s can also extend from multiple types.
   ```ts
   interface Colorful {
     color: string;
   }
    
   interface Circle {
     radius: number;
   }
    
   interface ColorfulCircle extends Colorful, Circle {}
    
   const cc: ColorfulCircle = {
     color: "red",
     radius: 42,
   };
   ```
- [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) | TypeScript Docs

  union type is narrowed based on literal attribute value.
  ```ts
  interface Circle {
     kind: "circle";
     radius: number;
   }
    
   interface Square {
     kind: "square";
     sideLength: number;
   }
    
   type Shape = Circle | Square;
  ```
