var fs = require("fs");
var input = fs
  .readFileSync("day2.txt")
  .toString()
  .split("\n")
  .map((s) => s.split(" "));

// Part 1

var forward = input
  .filter((s) => s[0] == "forward")
  .reduce((acc, s) => (acc += parseInt(s[1], 10)), 0);

var up = input
  .filter((s) => s[0] == "up")
  .reduce((acc, s) => (acc += parseInt(s[1], 10)), 0);

var down = input
  .filter((s) => s[0] == "down")
  .reduce((acc, s) => (acc += parseInt(s[1], 10)), 0);

console.log({ forward, depth: down - up });

// Part 2

var data = input.reduce(
  (acc, s) => {
    const x = parseInt(s[1], 10);
    switch (s[0]) {
      case "forward":
        acc["horizontal"] += x;
        acc["depth"] += acc["aim"] * x;
        break;
      case "down":
        acc["aim"] += x;
        break;
      case "up":
        acc["aim"] -= x;
        break;
    }
    return acc;
  },
  { horizontal: 0, depth: 0, aim: 0 }
);

console.log(data);
