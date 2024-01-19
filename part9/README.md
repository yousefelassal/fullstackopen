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
