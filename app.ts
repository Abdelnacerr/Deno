import {
  dayOfYear,
  MINUTE,
} from "https://deno.land/std@0.125.0/datetime/mod.ts";

console.log("Day of year:", dayOfYear(new Date()));
console.log("Current day of year:", MINUTE);

const encoder = new TextEncoder();

const greet = encoder.encode("Hello world!\nMy name is Mohamed");

// await Deno.writeFile( "greet.txt", greet );

const file = await Deno.open("greet.txt");
await Deno.copy(file, Deno.stdout);
file.close();
