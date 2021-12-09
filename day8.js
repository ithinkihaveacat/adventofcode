const input = require("fs")
  .readFileSync("day8b.txt")
  .toString()
  .split("\n")
  .map((s) => {
    const tmp = s.split(" | ");
    return [
      tmp[0]
        .split(" ")
        .map((u) =>
          u
            .split("")
            .sort((a, b) => a.localeCompare(b))
            .join("")
        )
        .sort((a, b) =>
          a.length != b.length ? a.length - b.length : a.localeCompare(b)
        ),
      tmp[1].split(" ").map((u) =>
        u
          .split("")
          .sort((a, b) => a.localeCompare(b))
          .join("")
      ),
    ];
  });
// .map((s) => [...s[0].split(" "), ...s[1].split(" ")]);

// console.log(input);

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const digits = input
  .map((r) => r[1])
  .reduce((acc1, s) => {
    return (
      acc1 +
      s.reduce((acc2, t) => {
        // console.log({ t, len: t.length });
        switch (t.length) {
          case 2:
          case 3:
          case 4:
          case 7:
            return acc2 + 1;
          default:
            return acc2;
        }
      }, 0)
    );
  }, 0);

// console.log({ digits });

const permutations = permutator(["a", "b", "c", "d", "e", "f", "g"]);

console.log({ len: permutations.length });

// console.log({ permutations });

let total = 0;

input.map((r) => {
  const [signal, output] = r;
  // console.log({ signal });
  for (let i = 0; i < permutations.length; i++) {
    // console.log(i);
    const p = permutations[i];
    const first = p[2] < p[5] ? p[2] + p[5] : p[5] + p[2];
    // console.log({ first, signal: signal[0] });
    if (first != signal[0]) continue; // optimization, break if it's not gonna work out
    // console.log("match");
    // console.log({ p });
    const candidate = [
      p[0] + p[1] + p[2] + p[4] + p[5] + p[6], // 0
      p[2] + p[5], // 1
      p[0] + p[2] + p[3] + p[4] + p[6], // 2
      p[0] + p[2] + p[3] + p[5] + p[6], // 3
      p[1] + p[2] + p[3] + p[5], // 4
      p[0] + p[1] + p[3] + p[5] + p[6], // 5
      p[0] + p[1] + p[3] + p[4] + p[5] + p[6], // 6
      p[0] + p[2] + p[5], // 7
      p[0] + p[1] + p[2] + p[3] + p[4] + p[5] + p[6], // 8
      p[0] + p[1] + p[2] + p[3] + p[5] + p[6], // 9
    ].map((s) =>
      s
        .split("")
        .sort((a, b) => a.localeCompare(b))
        .join("")
    );
    // console.log({ candidate, signal });
    // console.log({
    //   candidate: candidate
    //     .sort((a, b) =>
    //       a.length != b.length ? a.length - b.length : a.localeCompare(b)
    //     )
    //     .join("|"),
    //   signal: signal.join("|"),
    // });
    if (
      candidate
        .sort((a, b) =>
          a.length != b.length ? a.length - b.length : a.localeCompare(b)
        )
        .join("|") == signal.join("|")
    ) {
      const m = [
        p[0] + p[1] + p[2] + p[4] + p[5] + p[6], // 0
        p[2] + p[5], // 1
        p[0] + p[2] + p[3] + p[4] + p[6], // 2
        p[0] + p[2] + p[3] + p[5] + p[6], // 3
        p[1] + p[2] + p[3] + p[5], // 4
        p[0] + p[1] + p[3] + p[5] + p[6], // 5
        p[0] + p[1] + p[3] + p[4] + p[5] + p[6], // 6
        p[0] + p[2] + p[5], // 7
        p[0] + p[1] + p[2] + p[3] + p[4] + p[5] + p[6], // 8
        p[0] + p[1] + p[2] + p[3] + p[5] + p[6], // 9
      ].reduce((acc, v, i) => {
        // console.log({ v, split: v.split("") });
        acc[
          v
            .split("")
            .sort((a, b) => a.localeCompare(b))
            .join("")
        ] = i;
        return acc;
      }, {});
      const n =
        m[output[0]] * 1000 +
        m[output[1]] * 100 +
        m[output[2]] * 10 +
        m[output[3]];
      console.log({ candidate, signal, output, m, n });
      // console.log({ n });
      total += n;
      console.log("qqqqqq");
      return;
    }
  }
});

console.log({ total });
