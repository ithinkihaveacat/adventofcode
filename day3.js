var fs = require("fs");
var input = fs
  .readFileSync("day3.txt")
  .toString()
  .split("\n")
  .map((s) => s.split("").map((n) => parseInt(n, 10)));

console.log({ length: input.length });

const rotate = (arr) => {
  return arr.reduce((acc, r) => {
    r.forEach((v, i) => {
      if (!acc[i]) {
        acc[i] = [];
      }
      acc[i].push(v);
    });
    return acc;
  }, []);
};

const rotated = rotate(input);

const gamma = parseInt(
  rotated
    .map((r) => {
      return r.reduce((acc, v) => (acc += v), 0) > r.length / 2 ? 1 : 0;
    })
    .join(""),
  2
);

const epsilon = parseInt(
  rotated
    .map((r) => {
      return r.reduce((acc, v) => (acc += v), 0) > r.length / 2 ? 0 : 1;
    })
    .join(""),
  2
);

console.log({ gamma, epsilon, power: gamma * epsilon });

const foo = [
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
].filter((row) => row[10] == 0);

// console.log({ foo });
// process.exit(1);

// const majority = rotated.map((r) => {
//   return r.reduce((acc, v) => (acc += v), 0) > r.length / 2 ? 1 : 0;
// });

// const minority = rotated.map((r) => {
//   return r.reduce((acc, v) => (acc += v), 0) > r.length / 2 ? 0 : 1;
// });

const majorityAt = (arr, n) => {
  const count = arr.reduce((acc, r) => acc + r[n], 0);
  return count >= arr.length / 2 ? 1 : 0;
};

// console.log(majorityAt(input.splice(0, 5), 0));

// console.log(input.splice(0, 5));
// process.exit(1);

const value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce((arr, i) => {
  const m = majorityAt(arr, i);
  console.log({ i, m, arr });
  // console.log({ i, m });
  const last = arr.slice(-1)[0];
  const filtered = arr.filter((row) => row[i] == m);
  console.log({ filtered });
  if (filtered.length) {
    return filtered;
  } else {
    console.log({ last, value: parseInt(last.join(""), 2) });
    process.exit(1);
  }
}, input);

console.log({ value: parseInt(value[0].join(""), 2) });
