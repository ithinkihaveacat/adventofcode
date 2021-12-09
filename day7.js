const input = require("fs")
  .readFileSync("day7b.txt")
  .toString()
  .split(",")
  .map((s) => parseInt(s, 10));

const data = input
  .sort((a, b) => a - b)
  .reduce((acc, n) => {
    if (!acc[n]) acc[n] = 0;
    acc[n]++;
    return acc;
  }, {});

const unique = Object.keys(data);

const cost = [0];

for (let i = 1; i < 2000; i++) {
  cost[i] = cost[i - 1] + i;
  console.log({ i, cost: cost[i] });
}

console.log({ cost });

let min = Number.MAX_SAFE_INTEGER;
for (v of unique) {
  let fuel = 0;
  for (w of unique) {
    fuel += cost[Math.abs(v - w)] * data[w];
  }
  min = fuel < min ? fuel : min;
  console.log({ v, fuel });
}

console.log({ min });
