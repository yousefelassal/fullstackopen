const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
}
  
const i:number = Number(process.argv[2])
const ii:number = Number(process.argv[3])
multiplicator(i, ii, `Multiplied ${i} and ${ii}, the result is:`);