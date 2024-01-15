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
