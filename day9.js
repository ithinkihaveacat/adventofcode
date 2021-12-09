const input = require("fs")
  .readFileSync("day9b.txt")
  .toString()
  .split("\n")
  .map((s) => s.split("").map((n) => parseInt(n, 10)));

console.log(input);

const xlength = input.length;
const ylength = input[0].length;

// console.log({ xlength, ylength });

const get = (x, y) => {
  return x < 0 || y < 0 || x >= xlength || y >= ylength ? 10 : input[x][y];
};

const checker = (l0, l1) => {};

const neighbours = (x, y) => {
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].map((n) => {
    const [i, j] = n;
    // console.log({ i, j, get: get(x + i, y + j) });
    return get(x + i, y + j);
  });
};

let sum = 0;
let sizes = [];

for (let x = 0; x < xlength; x++) {
  for (let y = 0; y < ylength; y++) {
    const n = neighbours(x, y);
    const flag = n.reduce((acc, v) => acc && input[x][y] < v, true);
    if (flag) {
      console.log({ x, y, input: input[x][y], n });
      const checker = (size, l) => {
        if (l.length == 0) {
          return size;
        }
        const [x, y] = l.shift();
        if (get(x, y) >= 9) {
          return checker(size, l);
        } else {
          input[x][y] = 11;
          return checker(
            size + 1,
            l.concat(
              [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1],
              ].map((p) => {
                const [i, j] = p;
                return [x + i, y + j];
              })
            )
          );
        }
      };
      sizes.push(checker(0, [[x, y]]));
    }
  }
}

console.log({ sizes: sizes.sort((a, b) => b - a) });
