const input = require("fs")
  .readFileSync("day6b.txt")
  .toString()
  .split(",")
  .map((s) => parseInt(s, 10));

const transformed = input.reduce(
  (acc, n) => {
    acc[n]++;
    return acc;
  },
  [...new Array(10)].map(() => 0)
);

// console.log(input);

// console.log(transformed);

for (let i = 0; i < 256; i++) {
  console.log({ i, transformed });
  const first = transformed.shift();
  transformed[6] += first;
  transformed[8] = first;
  const total = transformed.reduce((acc, n) => acc + n, 0);
  console.log({ total });
}

// const total = transformed.reduce((acc, n) => acc + n, 0);

// console.log({ total });
